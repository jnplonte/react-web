import { useEffect, useState } from 'react';

import * as PropTypes from 'prop-types';

import { Box, Typography, Dialog, Button, DialogTitle, DialogActions, DialogContent } from '@mui/material';

import WarningIcon from '@mui/icons-material/Warning';
import ErrorIcon from '@mui/icons-material/Error';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import { confirmDialogStyles } from './confirm-dialog.style';

const ConfimDialogComponent = (props: any) => {
	const { className, onFalse, onTrue, isVisible, type, title, message, buttonFalseText, buttonTrueText } = props;

	const [icon, setIcon] = useState(<CheckCircleIcon sx={confirmDialogStyles.dialogTitleIcon} />);
	const [dialogClass, setDialogClass] = useState('blue-bg');

	useEffect(() => {
		switch (type) {
			case 'warning':
				setIcon(<WarningIcon sx={confirmDialogStyles.dialogTitleIcon} />);
				setDialogClass('yellow-bg');
				break;
			case 'general':
				setIcon(<CheckCircleIcon sx={confirmDialogStyles.dialogTitleIcon} />);
				setDialogClass('blue-bg');
				break;
			case 'error':
				setIcon(<ErrorIcon sx={confirmDialogStyles.dialogTitleIcon} />);
				setDialogClass('red-bg');
				break;
			default:
				setIcon(<CheckCircleIcon sx={confirmDialogStyles.dialogTitleIcon} />);
				setDialogClass('blue-bg');
		}
	}, [type]);

	return (
		<div sx={[confirmDialogStyles.root]} className={className}>
			<Dialog maxWidth="sm" open={isVisible} onClose={onFalse}>
				<DialogTitle className={dialogClass}>
					<Box sx={confirmDialogStyles.dialogTitle}>
						{icon}
						<Typography sx={confirmDialogStyles.dialogTitleText}>{title}</Typography>
					</Box>
				</DialogTitle>
				<DialogContent>
					<Typography sx={confirmDialogStyles.dialogContentText}>{message}</Typography>
				</DialogContent>
				<DialogActions>
					<Button onClick={onFalse} color="secondary">
						{buttonFalseText}
					</Button>
					<Button onClick={onTrue} color="primary" autoFocus>
						{buttonTrueText}
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
};

ConfimDialogComponent.propTypes = {
	className: PropTypes.string,
	buttonTrueText: PropTypes.string.isRequired,
	buttonFalseText: PropTypes.string.isRequired,
	message: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	isVisible: PropTypes.bool.isRequired,
	type: PropTypes.string.isRequired,

	onFalse: PropTypes.func.isRequired,
	onTrue: PropTypes.func.isRequired,
};

export default ConfimDialogComponent;
