const PosterModel = require('../models/poster');
const { multipleMongooseToObject } = require('../../util/mongoose')


//tách route và method route của index.js ra để dễ quản lý
class SiteController {
  // [GET] /
  async index(req, res) {
    try {
      let poster = await PosterModel.find();
      //toObject là convert từ dạng document về dạng object
      res.render('home', {
        poster: multipleMongooseToObject(poster)
      });
    } catch (next) {

    }
  }

  // [GET] /search
  search(req, res) {
    res.render('search');
  }
}

module.exports = new SiteController();
