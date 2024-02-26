//tạo express trong node-moudle
const path = require('path');
const express = require('express');
const morgan = require('morgan');
const { engine } = require('express-handlebars');

//gọi hàm ra để chạy source
const app = express();
//tùy chọn port được
const port = 3000;
//static file
app.use(express.static(path.join(__dirname, 'public')));
//https logger
app.use(morgan('combined'));
//teamplate engine
app.engine('hbs', engine({
  extname: '.hbs'
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources/views'));
//route 
app.get('/', (req, res) => {
  res.render('home');
});

app.get('/news', (req, res) => {
  res.render('news');
});
// Ip: 12.0.0.1 - localhost
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});