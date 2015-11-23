var express = require('express');
var httpProxy = require('http-proxy');

var app = express();
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

var routes = require('./routes');

app.set('port', 3000);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(methodOverride('X-HTTP-Method'));          // Microsoft
app.use(methodOverride('X-HTTP-Method-Override')); // Google/GData
app.use(methodOverride('X-Method-Override'));      // IBM
app.use(methodOverride('_method'));

app.use('/', routes);
app.use(express.static( '../client'));

app.use(function(req, res, next) {
  res.status(404);
  
  if (req.accepts('html')) {
      
      var err = new Error("Not Found, url:" + req.url);
      err.status = 404;
      
      res.status(err.status || 500);
      res.json({ 
          message: err.message,
          error: err 
      });
      
      return;
  }
  
  if (req.accepts('json')) {
    res.send({ error: 'Not found' });
    return;
  }

  res.type('txt').send('Not found');
});

var apiProxy = httpProxy.createProxyServer();

var server = app.listen(app.get('port'), function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('andonAPI is listening at http://%s:%s', host, port);

});

module.exports = app;