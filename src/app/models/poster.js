const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;
//quy tắc đặt tên data trên mdb phải có s, nếu k khi data tự chuyển code để đọc nó tự thêm s vào tên data mình tạo và nó sẽ k hiểu => data rỗng 
const Poster = new Schema({
    name: { type: String, require: true },
    description: { type: String },
    image: { type: String },
    videoId: { type: String, require: true },
    level: { type: String },
    //install mongoose-slug-generator vào để nó tự tạo slug từ name, unique là để chống k tạo data trùng lặp -> nó dùng lib shortid tích hợp sẵn trong lib mongoose-slug-generator
    slug: { type: String, slug: 'name'},
    isDeleted: {type: Boolean, default: false}
    // lưu thời gian bản ghi được tạo
    // createdAt: { type: Date, default: Date.now },
    // lưu thời gian bản ghi cập nhật
    // updatedAt: { type: Date, default: Date.now },
}, {
    timestamps: true //tự tạo 2 dòng createdAt vs updatedAt
});
//ADD PLUGINS
// mongoose.plugin(slug);
//add plugin trực tiếp cho Schema tạo ở trên, viết dưới vì sau khởi tạo mới có schema, lib này dùng hỗ trợ xóa nhưng vẫn lưu dữ liệu( ghi đè dữ liệu xóa)
// Poster.plugin(mongooseDelete, {
//     overrideMethods: 'all',
//     deletedAt: true
// });

module.exports = mongoose.model('poster', Poster);
