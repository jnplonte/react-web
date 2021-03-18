import React from 'react';
import * as PropTypes from 'prop-types';

import { Button, DialogTitle, DialogContent, DialogActions, Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

import WarningIcon from '@material-ui/icons/Warning';

const ConfirmDialog = (props: any) => {
	const { className, text, onConfirm, onCancel, data } = props;

	const { t } = useTranslation();

	return (
		<div>
			<DialogTitle disableTypography className={className}>
				<Typography variant="h4">
					<WarningIcon className="MuiIcon" /> {t(`general.${className}`)}
				</Typography>
			</DialogTitle>
			<DialogContent>
				<p>{text}</p>
			</DialogContent>
			<DialogActions>
				<Button onClick={onCancel} color="primary">
					{t('general.cancel')}
				</Button>
				<Button onClick={() => onConfirm(data)} color="primary" autoFocus>
					{t('general.confirm')}
				</Button>
			</DialogActions>
		</div>
	);
};

ConfirmDialog.propTypes = {
	className: PropTypes.string,
	text: PropTypes.string,
	onConfirm: PropTypes.func.isRequired,
	onCancel: PropTypes.func.isRequired,
	data: PropTypes.object.isRequired,
};

export default ConfirmDialog;
