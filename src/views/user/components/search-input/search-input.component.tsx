import React from 'react';
import * as PropTypes from 'prop-types';

import clsx from 'clsx';
import { MouseEvent, ChangeEvent, KeyboardEvent, useState } from 'react';
import { Paper, Input, Button } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

import SearchIcon from '@material-ui/icons/Search';

import { searchInputStyles } from './search-input.style';

import { Helper } from '../../../../services/helper/helper.service';

const helper: Helper = new Helper();

const SearchInput = (props: any) => {
	const { className, placeholder, refreshData } = props;

	const classes: any = searchInputStyles();
	const { t } = useTranslation();

	const [search, setSearch] = useState('');

	const handleSearch = (event: MouseEvent | KeyboardEvent) => {
		event.preventDefault();

		let targetValue: string | null = null;

		if (helper.isNotEmpty(search)) {
			targetValue = `username:${search}`;
		} else {
			targetValue = null;
		}

		refreshData('query', targetValue);
	};

	const handleChange = (event: ChangeEvent<{ name?: string; value: unknown }>) => {
		event.persist();

		const target: HTMLInputElement = event.target as HTMLInputElement;
		setSearch(target.value);
	};

	const keyPress = (event: KeyboardEvent) => {
		if (event.key === 'Enter') {
			handleSearch(event);
		}
	};

	return (
		<Paper className={clsx(classes.root, className)}>
			<Input
				onKeyDown={keyPress}
				className={classes.input}
				disableUnderline
				placeholder={placeholder}
				onChange={handleChange}
				value={search || ''}
			/>
			<Button onClick={handleSearch} variant="contained" color="secondary" startIcon={<SearchIcon />}>
				{t('user.search')}
			</Button>
		</Paper>
	);
};

SearchInput.propTypes = {
	className: PropTypes.string,
	placeholder: PropTypes.string,
	refreshData: PropTypes.func,
};

export default SearchInput;
