import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { renderRoutes } from 'react-router-config';
import serialize from 'serialize-javascript';
import Loadable from 'react-loadable';
import 'jsdom-global';
import jsdom from 'jsdom';
import 'amdefine';
import manifest from '../../build/assets-manifest.json';
import { createStore } from '../client/state/store/configureStore';
import { getBundles } from './getBundles';

const renderer = async (req, res, allRoutes) => {
    const context = {};
    const store = createStore();
    const modules = [];

    const { JSDOM } = jsdom;
    const DOM = new JSDOM('<!doctype html><html><head></head><body></body></html>');

    const { window } = DOM;

    function copyProps(src, target) {
        const props = Object.getOwnPropertyNames(src)
            .filter(prop => typeof target[prop] === 'undefined')
            .map(prop => Object.getOwnPropertyDescriptor(src, prop));
        Object.defineProperties(target, props);
    }

    window.Object = Object;
    window.Math = Math;

    global.window = window;
    global.document = window.document;
    global.navigator = {
        userAgent: 'node.js'
    };
    copyProps(window, global);

    // pre-render for async data fetching
    ReactDOMServer.renderToString(
        (<Loadable.Capture report={moduleName => modules.push(moduleName)}>
            <Provider store={store}>
                <StaticRouter location={req.url} context={context}>
                    {renderRoutes(allRoutes, req.path)}
                </StaticRouter>
            </Provider>
        </Loadable.Capture>)
    );

    const state = store.getState();
    const promises = state.dataFetch && state.dataFetch.promises;

    Promise.all(promises).then(() => {
        const content = ReactDOMServer.renderToString(
            <Loadable.Capture report={moduleName => modules.push(moduleName)}>
                <Provider store={store}>
                    <StaticRouter location={req.url} context={context}>
                        {renderRoutes(allRoutes, req.path)}
                    </StaticRouter>
                </Provider>
            </Loadable.Capture>
        );

        const bundles = getBundles(manifest, modules);
        const jsChunks = bundles && bundles.js
            .map(c => `<script src="/${c.file}"></script>`).join('\n');
        const cssChunks = bundles && bundles.css
            .map(c => `<link rel="stylesheet" type="text/css" href="/${c.file}" />`).join('\n');

        const contentFull = `
                <!doctype html>
                <html>
                    <head>
                        <meta charset="utf-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">
                        <meta http-equiv="X-UA-Compatible" content="ie=edge"/>
                        <link rel="stylesheet" type="text/css" href="/main.css" rel="stylesheet" />
                        <link rel="stylesheet" type="text/css" href="/manifest.chunk.css" rel="stylesheet" />
                        ${cssChunks}                       
                    </head>
                    <body>
                        <div id="root" style="height:100%">${content}</div>
                        <script>window.INITIAL_STATE = ${serialize(store.getState())}</script>
                        <script type="text/javascript" src="/bundle.js"></script>
                        ${jsChunks}
                        <script>window.main();</script>
                    </body>
                </html>
              `;

        res.send(contentFull);
    }).catch(() => {});
};

export default renderer;
