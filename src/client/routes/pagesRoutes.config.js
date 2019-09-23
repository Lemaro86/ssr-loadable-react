import urlExamples from '../../../urlExamples.json'

const pagesRoutes = async routePage => {
    const routesPageConfig = [];

    const promise = new Promise((res) => {
       setTimeout(1000, () => res(urlExamples));
    });

    await promise
        .then(item => item.json())
        .then(data => data.pages.forEach(item => routesPageConfig.push(routePage(item))))
        .catch(() => {});

    console.log('----------------routesPageConfig---', routesPageConfig);
    return routesPageConfig;
};

export default pagesRoutes;
