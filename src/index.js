//tạo express trong node-moudle
const path = require('path');
const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override');
const { engine } = require('express-handlebars');

//gọi hàm ra để chạy source
const app = express();
//tùy chọn port được
const port = 3000;
const route = require('./routes');

const db = require('./config/db');

//Connect DB
db.connect();
//static file
app.use(express.static(path.join(__dirname, 'public')));
//1 dạng middleware của xử lý các method của nodejs như ajax,fetch,jquery...
app.use(
    express.urlencoded({
        //dòng dưới phải có vì yêu cầu của thư viện body-parser-npm, nó sẽ warning ở terminal nếu k có
        extended: true,
    }),
);
app.use(express.json());
//phương thức ghi đè để html đọc được method khác ngoài GET, POST như PUT,HEAD,DELETE...(import lib trên dòng 5)
app.use(methodOverride('_method'))

//https logger
app.use(morgan('combined'));


//teamplate engine
app.engine(
    'hbs',
    engine({
        extname: '.hbs',
        helpers: {
            sum: (a, b) => a + b,
        }
    }),
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

//Routes init
route(app);

// Ip: 12.0.0.1 - localhost
app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
