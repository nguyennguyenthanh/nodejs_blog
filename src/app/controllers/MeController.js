const PosterModel = require('../models/poster');
const { multipleMongooseToObject } = require('../../util/mongoose')


//tách route và method route của index.js ra để dễ quản lý
class MeController {
  // [GET] /me/stored/posters
  async storedPosters(req, res, next) {
    //vì có 2 promise cùng lúc nên bị bất đồng bộ, nên chạy promise all
    Promise.all([PosterModel.find({isDeleted: false}), PosterModel.countDocuments({isDeleted: true})])
      .then(([poster, deletedCount]) =>
        res.render('me/stored-posters', {
          deletedCount,
          poster: multipleMongooseToObject(poster),
        })
      )
      .catch(next);
    // GỘP CHUNG 2 CÁI DƯỚI VÀO RỒI
    //method đếm biến đc xóa trong mongoose-deleted
    // PosterModel.countDocumentsDeleted()
    //   .then((deletedCount) => {
    //     console.log(deletedCount);
    //   })
    //   .catch(() => { })
    // thêm field hoặc bắn hành động deletedAt này lên DB và set giá trị ở find({}) khác với giá trị date của field này trên DB vì data UI đang được hiện ở path me/stored-courses này (nhưng nếu như v thì phải đi thêm deletedAt: null ở các component có control delete -> bất tiện -> nên sửa tác vụ này ở models/poster.js vì nó quản lý chung toàn source)
    // PosterModel.find({})
    //   .then(poster => res.render('me/stored-posters', {
    //     poster: multipleMongooseToObject(poster),
    //   }))

  }
  // [GET] /me/trash/posters
  trashPosters(req, res, next) {
    // thêm field hoặc bắn hành động deletedAt này lên DB và set giá trị ở find({}) khác với giá trị date của field này trên DB vì data UI đang được hiện ở path me/stored-courses này (nhưng nếu như v thì phải đi thêm deletedAt: null ở các component có control delete -> bất tiện -> nên sửa tác vụ này ở models/poster.js vì nó quản lý chung toàn source)
    PosterModel.find({isDeleted: true})
      .then(poster => res.render('me/trash-posters', {
        poster: multipleMongooseToObject(poster),
      }))
      .catch(next);
  }

}

module.exports = new MeController();
