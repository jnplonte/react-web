import { ChangeEvent, MouseEvent, useState, useEffect, useCallback, useMemo } from 'react';

import * as PropTypes from 'prop-types';

import clsx from 'clsx';

import { Link, useParams, withRouter } from 'react-router-dom';
import {
	Paper,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
	TablePagination,
	IconButton,
	Modal,
	Chip,
} from '@mui/material';
import { useTranslation } from 'react-i18next';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import { userTableStyles } from './user-table.style';

import { UserForm } from '../../components';
import { ConfirmDialogComponent } from '../../../../components';

import { GetAuth } from '../../../../provider/authentication/authentication.provider';
import { GetSiteInformation } from '../../../../provider/site-information/site-information.provider';
import { UserAPI } from '../../../../api/user.api';

import { ICoreProps } from '../../../../interfaces/core.interface';

const UserTable = (props: any) => {
	const { className, refreshData, data, pagination, limit, history } = props;

	const classes: any = userTableStyles();
	const { t } = useTranslation();

	const { token, authData } = GetAuth();
	const { setNotificationData } = GetSiteInformation();
	const userRequest: UserAPI = useMemo(() => new UserAPI(token), [token]);

	const { userId } = useParams<{ userId: string }>();

	const [editModal, setEditModal] = useState(false);
	const [deleteModal, setDeleteModal] = useState(false);

	const [selected, setSelected] = useState<ICoreProps>({});

	const handleEditOpen = useCallback(
		async (uId: string = '') => {
			const requestData: any = await userRequest.get({ id: uId });
			if (requestData.data) {
				setEditModal(true);
				setSelected(requestData.data || {});
			} else {
				setEditModal(false);
				setSelected({});
			}
		},
		[userRequest]
	);

	useEffect(() => {
		if (userId && authData && authData['id'] !== userId) {
			handleEditOpen(userId);
		}

		return () => {
			setEditModal(false);
			setDeleteModal(false);
			setSelected({});
		};
	}, []);

	const handlePageChange = (event: MouseEvent | null, nPage: number) => {
		event?.preventDefault();

		refreshData({ page: nPage + 1 });
	};

	const handleRowsPerPageChange = (event: ChangeEvent | null) => {
		const target: HTMLInputElement = event?.target as HTMLInputElement;

		refreshData('limit', Number(target.value));
	};

	const handleEditClose = () => {
		setEditModal(false);
		setSelected({});

		history.push('/user');
	};

	const handleEditConfirm = async (uData: any = {}) => {
		const apiData: object = {
			email: uData['email'],
			firstName: uData['firstName'],
			lastName: uData['lastName'],
			phone: uData['phone'] || '',
		};
		const requestData: any = await userRequest.put({ id: selected['id'] }, apiData);
		setNotificationData({ type: requestData.type, message: requestData.message });

		if (requestData.data) {
			refreshData();
			setEditModal(false);
		}
	};

	const handleDeleteOpen = (uId: string = '') => {
		setDeleteModal(true);
		setSelected({ id: uId });
	};

	const handleDeleteClose = () => {
		setDeleteModal(false);
		setSelected({});
	};

	const handleDeleteConfirm = async (result: any) => {
		setDeleteModal(false);

		if (result) {
			const requestData: any = await userRequest.delete({ id: selected['id'] });
			setNotificationData({ type: requestData.type, message: requestData.message });

			if (requestData.data) {
				refreshData();
			}
		}
	};

	const roleIdAdmin = () => Number(process.env.REACT_APP_ROLE_ID_ADMIN);

	return (
		<Paper className={clsx(classes.root, className)}>
			<Modal open={editModal} onClose={handleEditClose}>
				<div className={clsx(classes.root, 'modal')}>
					<UserForm onUpdate={handleEditConfirm} onCancel={handleEditClose} type="update" data={selected} />
				</div>
			</Modal>

			<ConfirmDialogComponent
				isVisible={deleteModal}
				title={t('general.warning')}
				message={t('user.delete')}
				buttonTrueText={t('general.confirm')}
				buttonFalseText={t('general.cancel')}
				onFalse={handleDeleteClose}
				onTrue={handleDeleteConfirm}
				type="warning"
			/>

			<Table className={classes.table} size="small">
				<TableHead>
					<TableRow>
						<TableCell>{t('user.fullName')}</TableCell>
						<TableCell>{t('user.userName')}</TableCell>
						<TableCell>{t('user.email')}</TableCell>
						<TableCell>{t('user.phone')}</TableCell>
						<TableCell align="center">{t('user.active')}</TableCell>
						<TableCell>{t('user.createdAt')}</TableCell>
						<TableCell align="center">{t('user.action')}</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{data.map((user: any) => (
						<TableRow className={classes.tableRow} hover key={user.id}>
							<TableCell>
								{user.firstName} {user.lastName}
							</TableCell>
							<TableCell>{user.username}</TableCell>
							<TableCell>{user.email}</TableCell>
							<TableCell>{user.phone}</TableCell>
							<TableCell align="center">
								{user.active ? (
									<Chip className="green-bg white" label={t('user.active')} />
								) : (
									<Chip className="red-bg white" label={t('user.inactive')} />
								)}
							</TableCell>
							<TableCell>{user.createdAt}</TableCell>
							<TableCell align="center">
								<IconButton
									disabled={(authData && authData['id'] === user.id) || user.roleId === roleIdAdmin()}
									onClick={() => handleEditOpen(user.id)}
									component={Link}
									to={`/user/${user.id}`}
									size="large"
								>
									<EditIcon
										className={clsx({
											green: (authData && authData['id'] === user.id) || user.roleId !== roleIdAdmin(),
											grey: (authData && authData['id'] === user.id) || user.roleId === roleIdAdmin(),
										})}
									/>
								</IconButton>
								<IconButton
									disabled={(authData && authData['id'] === user.id) || user.roleId === roleIdAdmin()}
									onClick={() => handleDeleteOpen(user.id)}
									size="large"
								>
									<DeleteIcon
										className={clsx({
											red: (authData && authData['id'] === user.id) || user.roleId !== roleIdAdmin(),
											grey: (authData && authData['id'] === user.id) || user.roleId === roleIdAdmin(),
										})}
									/>
								</IconButton>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
			<TablePagination
				component="div"
				count={pagination.totalData || 0}
				onPageChange={handlePageChange}
				onRowsPerPageChange={handleRowsPerPageChange}
				page={(pagination.currentPage || 1) - 1}
				rowsPerPage={limit}
				rowsPerPageOptions={[10, 20, 30]}
			/>
		</Paper>
	);
};

UserTable.propTypes = {
	className: PropTypes.string,
	refreshData: PropTypes.func.isRequired,
	data: PropTypes.array.isRequired,
	limit: PropTypes.number.isRequired,
	pagination: PropTypes.object.isRequired,
};

export default withRouter(UserTable);
