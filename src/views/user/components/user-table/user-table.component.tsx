import React from 'react';
import * as PropTypes from 'prop-types';

import clsx from 'clsx';

import { Link, useParams, withRouter } from 'react-router-dom';
import { ChangeEvent, MouseEvent, useState, useEffect, useCallback, useMemo } from 'react';
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
	Dialog,
} from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

import { userTableStyles } from './user-table.style';

import { UserForm, DeleteForm } from '../../components';

import { GetAuth } from '../../../../provider/authentication/authentication.provider';
import { GetSiteInformation } from '../../../../provider/site-information/site-information.provider';
import { UserAPI } from '../../../../api/user.api';

const UserTable = (props: any) => {
	const { className, refreshData, data, pagination, limit, history } = props;

	const classes: any = userTableStyles();

	const { token, authData } = GetAuth();
	const { setNotificationData } = GetSiteInformation();
	const userRequest: UserAPI = useMemo(() => new UserAPI(token), [token]);

	const { userId } = useParams<{ userId: string }>();

	const [editModal, setEditModal] = useState(false);
	const [deleteModal, setDeleteModal] = useState(false);

	const [selected, setSelected] = useState({});

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
		if (userId && authData['id'] !== userId) {
			handleEditOpen(userId);
		}

		return () => {
			setEditModal(false);
			setDeleteModal(false);
			setSelected({});
		};
	}, [userId, authData, handleEditOpen]);

	const handlePageChange = (event: MouseEvent<HTMLButtonElement>, nPage: number) => {
		event.preventDefault();

		refreshData('page', nPage + 1);
	};

	const handleRowsPerPageChange = (event: ChangeEvent) => {
		const target: HTMLInputElement = event.target as HTMLInputElement;

		refreshData('limit', Number(target.value));
	};

	const handleEditClose = () => {
		setEditModal(false);
		setSelected({});

		history.push('/user');
	};

	const handleEditConfirm = async (uData: object = {}) => {
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

	const handleDeleteConfirm = async (uData: object = {}) => {
		const requestData: any = await userRequest.delete({ id: selected['id'] });
		setNotificationData({ type: requestData.type, message: requestData.message });

		if (requestData.data) {
			refreshData();
			setDeleteModal(false);
		}
	};

	return (
		<Paper className={clsx(classes.root, className)}>
			<Modal open={editModal} onClose={handleEditClose}>
				<div className={clsx(classes.root, 'modal')}>
					<UserForm onUpdate={handleEditConfirm} onCancel={handleEditClose} type='update' data={selected} />
				</div>
			</Modal>

			<Dialog open={deleteModal} onClose={handleDeleteClose}>
				<div className={classes.dialog}>
					<DeleteForm onDelete={handleDeleteConfirm} onCancel={handleDeleteClose} data={selected} />
				</div>
			</Dialog>

			<Table className={classes.table}>
				<TableHead>
					<TableRow>
						<TableCell>Full Name</TableCell>
						<TableCell>UserName</TableCell>
						<TableCell>Email Address</TableCell>
						<TableCell>Phone Number</TableCell>
						<TableCell align='center'>Active</TableCell>
						<TableCell>Created At</TableCell>
						<TableCell align='center'>Action</TableCell>
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
							<TableCell align='center'>
								{user.active ? <CheckIcon className='green' /> : <CloseIcon className='red' />}
							</TableCell>
							<TableCell>{user.createdAt}</TableCell>
							<TableCell align='center'>
								<IconButton
									disabled={authData['id'] === user.id}
									onClick={() => handleEditOpen(user.id)}
									component={Link}
									to={`/user/${user.id}`}
								>
									<EditIcon
										className={clsx({
											green: authData['id'] !== user.id,
											grey: authData['id'] === user.id,
										})}
									/>
								</IconButton>
								<IconButton disabled={authData['id'] === user.id} onClick={() => handleDeleteOpen(user.id)}>
									<DeleteIcon
										className={clsx({
											red: authData['id'] !== user.id,
											grey: authData['id'] === user.id,
										})}
									/>
								</IconButton>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
			<TablePagination
				component='div'
				count={pagination.totalData || 0}
				onChangePage={handlePageChange}
				onChangeRowsPerPage={handleRowsPerPageChange}
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
