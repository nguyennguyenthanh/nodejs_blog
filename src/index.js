//tạo express trong node-moudle
const express = require('express');
const morgan = require('morgan');
const handlebars = require('express-handlebars');

//gọi hàm ra để chạy source
const app = express();
//tùy chọn port được
const port = 3000;

//https logger
app.use(morgan('combined'));

//teamplate engine
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');
// app.set('views', path.join(__dirname, 'views'));
console.log(__dirname);
//route 
app.get('/', (req, res) => {
  res.render('home');
});

// Ip: 12.0.0.1 - localhost
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});