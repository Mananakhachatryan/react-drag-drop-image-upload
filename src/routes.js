import React from 'react';

import BasicPageContainer from './containers/BasicPageContainer/BasicPageContainer';

export const Routes = [
  {
    isNavBar: true,
    isExact: true,
    path: '/',
    name: 'Home',
    component: BasicPageContainer,
  }
];
