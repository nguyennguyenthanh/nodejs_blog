const Course = require('../models/Course');

//tách route và method route của index.js ra để dễ quản lý
class SiteController {
    // [GET] /
    index(req, res) {
        Course.find({}, function (err, courses) {
            if (!err) {
                res.json(courses);
            } else {
                res.status(400).json({ err: 'ERROR!!!' });
            }
        });
        // res.render('home');
    }

    // [GET] /search
    search(req, res) {
        res.render('search');
    }
}

module.exports = new SiteController();
