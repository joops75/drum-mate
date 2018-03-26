var express = require('express');
var app = express();
var path = require('path');
var isDevelopment = process.env.NODE_ENV !== "production";
var port = process.env.PORT || 3000;

app.use('/client', express.static(path.join(__dirname, 'client')));

if (isDevelopment) {

  var webpack = require('webpack');
  var config = require('./webpack.config.dev');
  var compiler = webpack(config);

  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
  }));

  app.use(require('webpack-hot-middleware')(compiler));

  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
  });

} else {

  app.use('/dist', express.static(path.join(__dirname, 'dist')));

  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'indexProduction.html'));
  });

}

app.listen(port)
