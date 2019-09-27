import urlExamples from '../../../urlExamples.json'

const pagesRoutes = async routePage => {
    const routesPageConfig = [];

    const promise = new Promise((resolve) => {
       setTimeout(() => resolve(urlExamples), 1000);
    });

    await promise
        .then(data => {
            return data.forEach(item => routesPageConfig.push(routePage(item)))
        })
        .catch(() => {});

    return routesPageConfig;
};

export default pagesRoutes;
