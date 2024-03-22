const newsRouter = require('./news');
const meRouter = require('./me');
// trong '' là tê file
const postersRouter = require('./posts');
const siteRouter = require('./site');


function route(app) {
    app.use('/news', newsRouter);
    app.use('/me', meRouter);
    app.use('/posts', postersRouter);
    app.use('/', siteRouter);
}

module.exports = route;
