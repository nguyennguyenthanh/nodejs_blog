//tạo express trong node-moudle
const express = require('express')
//gọi hàm ra để chạy source
const app = express()
//tùy chọn port được
const port = 3000
//route 
app.get('/', (req, res) => {
  res.send('Hello World!')
})

// Ip: 12.0.0.1 - localhost
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})