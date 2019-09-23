import Loadable from 'react-loadable';
import pagesRoutes from './routes/pagesRoutes.config';

const AsyncNotFound = Loadable({
    loader: () => import(/* webpackChunkName: "notFound" */ '../containers/NotFound'),
    loading: () => {},
    modules: ['notFound']
});

const AsyncMainPage = Loadable({
    loader: () => import(/* webpackChunkName: "mainPage" */ '../containers/MainPage'),
    loading: () => {},
    modules: ['mainPage']
});

const AsyncPageFetch = Loadable({
    loader: () => import(/* webpackChunkName: "fetchPage" */ '../containers/FetchPage'),
    loading: () => {},
    modules: ['fetchPage']
});

const routePage = item => ({
    component: AsyncPageFetch,
    path: `/pageFetch/${item.id}`,
    pageId: item.id,
    exact: true
});

const getRoutes = async () => {
    const generalRoutes = [
        {
            component: AsyncMainPage,
            path: '/',
            exact: true
        },
        {
            component: AsyncPageFetch,
            path: '/fetchPage',
            exact: true
        }
    ];

    const pages = await pagesRoutes(routePage);

    return [
        ...generalRoutes,
        ...pages,
        {
            component: AsyncNotFound,
            path: '*'
        }
    ];
};

export default getRoutes;
