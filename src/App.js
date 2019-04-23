import React, { Suspense, Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Routes } from './routes';
import './assets/style/main.scss';
import Loader from './shared/Loader/index';

const App = () => {
  const renderSwitch = () => (
    <Switch>
      {Routes.map(route => {
        const component = route.component;
        return (
          <Route
            key={route.path}
            exact={route.isExact}
            path={route.path}
            component={component}
          />
        );
      })}
    </Switch>
  );

  return (
    <Suspense fallback={<Loader />} maxDuration={5000}>
      <Router>
        <div id="main">
          <Fragment>{renderSwitch()}</Fragment>
        </div>
      </Router>
    </Suspense>
  );
};

export default App;
