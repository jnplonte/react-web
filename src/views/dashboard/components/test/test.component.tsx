import * as React from 'react';
import * as PropTypes from 'prop-types';

import clsx from 'clsx';

import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme: any) => ({
  root: {
    height: '100%',
  },
  content: {
    alignItems: 'center',
    display: 'flex',
  },
}));

const TestComponent = (props: any) => {
  const { className } = props;

  const classes = useStyles();

  return (
    <div className={clsx(classes.root, className)}>
      TEST COMPONENT
    </div>
  );
};

TestComponent.propTypes = {
  className: PropTypes.string,
};

export default TestComponent;
