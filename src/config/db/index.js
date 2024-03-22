const mongoose = require('mongoose');

async function connect(params) {
    try {
        await mongoose.connect('mongodb://localhost:27017/blog_nodejs_dev', {
            // useNewUrlParser: true,
            // useUnifiedTopology: true,
            // useCreateIndex: true,
        });
        console.log('Connect successfully!!!');
    } catch (error) {
        console.log('Connect fail!!!');
    }
}

module.exports = { connect };
