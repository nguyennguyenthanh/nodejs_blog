module.exports = {
    //toObject là convert từ dạng document về dạng object
    //TH có 1 mảng
    multipleMongooseToObject: function (mongooseArrays) {
        return mongooseArrays.map(mongoose => mongoose.toObject());
    },
    //TH có 1 document thôi
    mongooseToObject: function (mongoose) {
        return mongoose ? mongoose.toObject() : mongoose;
    }
};
