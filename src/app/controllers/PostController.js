const PosterModel = require('../models/poster');
const { mongooseToObject } = require('../../util/mongoose')


//tách route và method route của index.js ra để dễ quản lý
class PosterController {
  // [GET] /posters/:slug
  show(req, res, next) {
    PosterModel.findOne({ slug: req.params.slug })
      .then(post => {
        res.render('posters/show', { post: mongooseToObject(post) });
      })
      .catch(next);
  }

  // [GET] /posters/create
  create(req, res, next) {
    res.render('posters/create')
  }

  // [POST] /posters/store
  async store(req, res, next) {
    try {
      const formData = req.body;
      formData.image = `https://bizweb.dktcdn.net/100/438/408/files/anh-chill-buon-yodyvn2.jpg?v=${req.body.videoId}`
      await PosterModel.create(formData);
      // const poster = new PosterModel(formData);
      // await poster.save();

      res.redirect('/me/stored/posters');
    }
    catch (err) {
      console.log('LOI NE CON DI:L ', err);
    }
  }

  // [GET] /posters/:id/edit
  edit(req, res, next) {
    PosterModel.findById(req.params.id)
      .then(poster => res.render('posters/edit', {
        poster: mongooseToObject(poster)
      }))
      .catch(next);

  }
  // [PUT] /posters/:id
  update(req, res, next) {
    PosterModel.updateOne({ _id: req.params.id }, req.body)
      .then(() => res.redirect('/me/stored/posters'))
      .catch(next);
  }

  // [DELETE] /posters/:id
  destroy(req, res, next) {
    // đoạn này là xóa thật khỏi database -> k hiệu quả với các dữ liệu nhạy cảm như tiền hoặc dữ liệu gì đó cần đối chiếu lại sau này
    // PosterModel.deleteOne({ _id: req.params.id })
    //   .then(() => res.redirect('back'))
    //   .catch(next);
    //Đoạn dưới dùng delete để xóa giả
    PosterModel.updateOne({ _id: req.params.id }, { isDeleted: true })
      .then(() => res.redirect('back'))
      .catch(next);
  }
  // [DELETE] /posters/:id/force   -> xóa vĩnh viễn
  forceDestroy(req, res, next) {
    PosterModel.deleteOne({ _id: req.params.id })
      .then(() => res.redirect('back'))
      .catch(next);
  }

  // [PATCH] /posters/:id/restore
  restore(req, res, next) {
    PosterModel.updateOne({ _id: req.params.id }, { isDeleted: false })
      .then(() => {
        res.redirect('back')
      })
      .catch(next);
  }
  // [POST] /posters/handle-form-actions
  handleFormActions(req, res, next) {
    switch (req.body.action) {
      case 'delete':
        console.log(req.body.posterIds);
        //$in để lọc giá trị từ mảng viết theo dạng jquery,  k có plugin nên k dùng đc delete mà phải dùng update sau khi click gửi request
        PosterModel.updateMany({ _id: { $in: req.body.posterIds } }, { isDeleted: true })
          .then(() => res.redirect('back'))
          .catch(next);
        break;

      default:
        res.json({ message: 'Action is invalid' });
    }
  }
}

module.exports = new PosterController();
