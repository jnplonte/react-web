import * as React from 'react';
import * as PropTypes from 'prop-types';

import clsx from 'clsx';
import { MouseEvent, KeyboardEvent, useRef } from 'react';
import { Paper, Input, Button } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

import { searchInputStyles } from './search-input.style';

import { Helper } from '../../../../services/helper/helper.service';

const helper: Helper = new Helper();

const SearchInput = (props: any) => {
  const { className, placeholder, refreshData } = props;

  const classes: any = searchInputStyles();

  const inputEl: any = useRef();

  const handleSearch = (event: MouseEvent | KeyboardEvent) => {
    event.preventDefault();

    const target: HTMLInputElement = inputEl.current as HTMLInputElement;

    let targetValue: string | null = null;

    if (helper.isNotEmpty(target.value)) {
      targetValue = `username:${target.value}`;
    } else {
      targetValue = null;
    }

    refreshData('query', targetValue);
  };

  const keyPress = (event: KeyboardEvent) => {
    if (event.keyCode === 13) {
      handleSearch(event);
    }
  };

  return (
    <Paper className={clsx(classes.root, className)}>
      <Input inputRef={inputEl} onKeyDown={keyPress} className={classes.input} disableUnderline placeholder={placeholder}/>
      <Button onClick={handleSearch} variant='contained' color='secondary' startIcon={<SearchIcon />}>Search</Button>
    </Paper>
  );
};

SearchInput.propTypes = {
  className: PropTypes.string,
  placeholder: PropTypes.string,
  refreshData: PropTypes.func,
};

export default SearchInput;
