import * as React from 'react';
import { withRouter } from 'react-router-dom';

import { todoListStyle } from './todo-list.style';

const TodoList = (props: any) => {
  const classes: any = todoListStyle();

  return (
    <div className={classes.root}>
      TODO LIST
    </div>
  );
};

export default withRouter(TodoList);
