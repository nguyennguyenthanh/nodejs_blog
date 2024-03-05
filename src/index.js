//tạo express trong node-moudle
const path = require('path');
const express = require('express');
const morgan = require('morgan');
const { engine } = require('express-handlebars');

//gọi hàm ra để chạy source
const app = express();
//tùy chọn port được
const port = 3000;
const route = require('./routes');
//static file
app.use(express.static(path.join(__dirname, 'public')));
//1 dạng middleware của xử lý các method của nodejs như ajax,fetch,jquery...
app.use(
  express.urlencoded({
    //dòng dưới phải có vì yêu cầu của thư viện body-parser-npm, nó sẽ warning ở terminal nếu k có
    extended: true,
  }),
);
//https logger
app.use(morgan('combined'));
//teamplate engine
            app.engine(
  'hbs',
  engine({
    extname: '.hbs',
  }),
);
          app.set('view engine', 'hbs');
                      app.set('views', path.join(__dirname, 'resources/views'));

//Routes init
route(app);

// Ip: 12.0.0.1 - localhost
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
