var path = require('path')
var express = require('express')
var webpack = require('webpack')
var config = require('./webpack.config')

var app = express()
var compiler = webpack(config)

app.use(require('webpack-dev-middleware')(compiler, {
  stats: {
    colors: true
  },
  publicPath: config.output.publicPath
}))

app.use(require('webpack-hot-middleware')(compiler))

app.use(express.static(path.join(__dirname, 'example/static')))

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'example', 'index.html'))
})

app.listen(3000, '0.0.0.0', (err) => {
  if (err) {
    console.log(err)
    return
  }
  console.log('Listening at http://0.0.0.0:3000')
})
