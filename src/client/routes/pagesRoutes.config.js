const fetch = require('node-fetch');

const pagesRoutes = async routePage => {
    const routesPageConfig = [];
    await fetch(`getUrl`)
        .then(item => item.json())
        .then(data => data.pages.forEach(item => routesPageConfig.push(routePage(item))))
        .catch(() => {});
    return routesPageConfig;
};

module.exports = {
    pagesRoutes
};
