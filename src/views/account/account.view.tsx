import * as React from 'react';

import { ChangeEvent, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { Tabs, Tab } from '@material-ui/core';

import { accountStyle } from './account.style';

import { GetAuth } from '../../provider/authentication/authentication.provider';

import { TabPannelComponent } from '../../components';
import { Profile, Password } from './components';

const Account = (props: any) => {
  const classes: any = accountStyle();

  const { authData } = GetAuth();

  const [value, setValue] = useState(0);

  const handleChange = (event: ChangeEvent, newValue: number) => {
    event.persist();

    setValue(newValue);
  };

  const handleProfileUpdate = async (uData: object = {}) => {
    console.log(uData);
  };

  const handlePasswordUpdate = async (uData: object = {}) => {
    console.log(uData);
  };

  return (
    <div className={classes.root}>
      <Tabs value={value} onChange={handleChange} variant='fullWidth'>
        <Tab label='Profile' id='tab-0' />
        <Tab label='Password' id='tab-1' />
      </Tabs>
      <TabPannelComponent value={value} index={0}>
        <Profile onUpdate={handleProfileUpdate} data={authData}/>
      </TabPannelComponent>
      <TabPannelComponent value={value} index={1}>
        <Password onUpdate={handlePasswordUpdate}/>
      </TabPannelComponent>
    </div>
  );
};

export default withRouter(Account);
