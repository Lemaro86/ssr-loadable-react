import express from 'express';
import Loadable from 'react-loadable';
import getRoutes from './client/Routes';
import renderer from './helpers/renderer';

/**
 * Here you are start your express server.
 * Remember it!
 * */
const app = express();
// for optimization bundle if you need install this package
// app.use(compression());

// it will be saved in memory your server(ex.: container of docker)
let allRoutes = [];

app.use('/', express.static('public'));
app.use('/public', express.static('public'));
app.use('/build', express.static('build'));

// bug fix for useragent if you have this bug
// app.use(useragent.express());

const developerEnv = app.get('env') === 'development';

/**
 * generation route
 * */
const routesGen = async (req, res, next) => {
    if (allRoutes.length > 0) {
        next()
    } else {
        try {
            allRoutes = await getRoutes();
        } catch (err) {
            console.log('get all routes failed with error: ', err);
        }
        next();
    }
};

app.use(routesGen);

// if you need here you can write sitemap generation code
// in other like this declaration you can right for robots.txt function
// app.get('/some url', async (req, res) => { });

/**
 * all pages our site ***************this server renderer and start
 * */
app.get('/*', async (req, res) => {
    renderer(req, res, allRoutes);
});

/**
 * Here you can logging you errors like so graylog
 * */
// graylog or redlog

const port = developerEnv ? 3001 : 3000;

Loadable.preloadAll().then(() => {
    app.listen(port, () => {
        console.log(`Look at this localhost:${port}`);
    });
}).catch(err => {
    console.log(err);
});
