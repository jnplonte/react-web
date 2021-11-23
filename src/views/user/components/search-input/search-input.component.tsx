import { MouseEvent, KeyboardEvent, ChangeEvent, useState } from 'react';

import * as PropTypes from 'prop-types';

import { Box, Grid, Input, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';

import SearchIcon from '@mui/icons-material/Search';

import { searchInputStyles } from './search-input.style';

import { Helper } from '../../../../services/helper/helper.service';

const helper: Helper = new Helper();

const SearchInput = (props: any) => {
	const { className, placeholder, refreshData } = props;

	const { t } = useTranslation();

	const [search, setSearch] = useState('');

	const handleSearch = (event: MouseEvent | KeyboardEvent | null) => {
		event?.preventDefault();

		let targetValue: string | null = null;

		if (helper.isNotEmpty(search)) {
			targetValue = `username:${search}`;
		} else {
			targetValue = null;
		}

		refreshData('query', targetValue);
	};

	const handleChange = (event: ChangeEvent<{ name?: string; value: unknown }> | null) => {
		event?.persist();

		const target: HTMLInputElement = event?.target as HTMLInputElement;
		setSearch(target.value);
	};

	const keyPress = (event: KeyboardEvent | null) => {
		if (event?.key === 'Enter') {
			handleSearch(event);
		}
	};

	return (
		<Box sx={[searchInputStyles.root]} className={className}>
			<Grid container spacing={1}>
				<Grid item xs={8} sm={7}>
					<Input
						sx={searchInputStyles.input}
						fullWidth
						onKeyDown={keyPress}
						placeholder={placeholder}
						onChange={handleChange}
						value={search || ''}
						type="text"
					/>
				</Grid>
				<Grid item xs={4} sm={5}>
					<Button
						sx={searchInputStyles.button}
						fullWidth
						onClick={handleSearch}
						variant="contained"
						color="secondary"
						startIcon={<SearchIcon />}
					>
						{t('user.search')}
					</Button>
				</Grid>
			</Grid>
		</Box>
	);
};

SearchInput.propTypes = {
	className: PropTypes.string,
	placeholder: PropTypes.string,
	refreshData: PropTypes.func,
};

export default SearchInput;
