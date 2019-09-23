import express from 'express';
import Loadable from 'react-loadable';
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
app.get('/getRoutes', async (req, res) => {

    try {
        allRoutes = await getRoutes();
    } catch (err) {
        console.log('get routes err: ', err);
    }

    if (allRoutes.length > 0) {
        return res.sendStatus(200);
    } else {
        return res.sendStatus(500)
    }
});

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
        console.log(`Look at this lol localhost:${port}`);
    });
}).catch(err => {
    console.log(err);
});
