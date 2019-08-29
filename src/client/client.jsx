import 'babel-polyfill';
import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { renderRoutes } from 'react-router-config';
import Loadable from 'react-loadable';
import 'intersection-observer';
import Routes from './Routes';
import reducers from './state/reducers';
import { enableDataFetch } from './state/reducers/dataFetch';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    reducers,
    window.INITIAL_STATE,
    composeEnhancers(applyMiddleware(thunk))
);

window.main = () => {
    Loadable.preloadReady().then(() => {
        return Routes();
    }).then(routes => {
        ReactDom.hydrate(
            <Provider store={store}>
            <BrowserRouter>
            {renderRoutes(routes)}
            </BrowserRouter>
            </Provider>,
            document.querySelector('#root'),
            () => store.dispatch(enableDataFetch())
        );
    });
};
