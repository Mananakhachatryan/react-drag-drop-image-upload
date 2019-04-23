import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { Provider } from 'react-redux';
import rootReducer from './store/reducers';
import { IntlProvider, addLocaleData } from 'react-intl';
import en from 'react-intl/locale-data/en';
import am from 'react-intl/locale-data/am';
import App from './App';
import 'bootstrap/dist/css/bootstrap.css';
// import { msg } from './config/messages.jsx';

const store = createStore(rootReducer, applyMiddleware(thunk, logger));

addLocaleData(en);
addLocaleData(am);

render(
  <IntlProvider
    // locale={msg().languageWithoutRegionCode}
  >
    <Provider store={store}>
      <App />
    </Provider>
  </IntlProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
// serviceWorker.unregister();
