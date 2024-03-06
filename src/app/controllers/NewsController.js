//tách route và method route của index.js ra để dễ quản lý
class NewsController {
    // [GET] (method) / news (path)
    index(req, res) {
        res.render('news');
    }

    // [GET] /news/:slug
    show(req, res) {
        res.send('NEW DETAIL!!!');
    }
}

module.exports = new NewsController();
