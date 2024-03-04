
//tách route và method route của index.js ra để dễ quản lý 
class SiteController {
  // [GET] /
  index(req, res) {
    res.render('home');
  }

  // [GET] /search
  search(req, res) {
    res.render('search');
  }
}

module.exports = new SiteController;