import * as React from 'react';

import { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { Grid, Typography } from '@material-ui/core';

import { userStyle } from './user.style';

import { UserTable, UserToolbar, SearchInput} from './components';

import { GetAuth } from '../../provider/authentication/authentication.provider';
import { UserAPI } from '../../api/user.api';

const User = (props: any) => {
  const classes: any = userStyle();

  const { token } = GetAuth();
  const userRequest: UserAPI = new UserAPI(token);

  const [apiParams, setApiParams] = useState<object>({ limit: 10, page: 1, order: null, query: null });

  const [users, setUsers] = useState<Array<any | null>>([]);
  const [paginations, setPaginations] = useState<object>({});

  useEffect(() => {
    fetchDataAsync();
  }, []);

  const fetchDataAsync = async () => {
    const requestData: any = await userRequest.getAll(apiParams);

    if (requestData.status && requestData.status === 'success') {
        setUsers(requestData.data || []);
        setPaginations(requestData.pagination || {});
    } else {
      setUsers([]);
      setPaginations({});
    }
  };

  const handleRefresh = (type: string, param: any) => {
    apiParams[type] = param;
    setApiParams(apiParams);

    fetchDataAsync();
  };

  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item xs={8} sm={4}>
          <SearchInput refreshData={handleRefresh} placeholder='Search User Name'/>
        </Grid>
        <Grid item xs={4} sm={8}>
          <UserToolbar />
        </Grid>
      </Grid>
      <div className={classes.content}>
        {users.length >= 1
          ?
            (<UserTable data={users} pagination={paginations} limit={apiParams['limit']} refreshData={handleRefresh}/>)
          :
            (<Typography className={classes.noUser} variant='h4'>No User Data</Typography>)
        }
      </div>
    </div>
  );
};

export default withRouter(User);
