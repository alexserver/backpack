var express = require('express'),
    util    = require('util'),
    dot     = require('dot').process({ path: "./layouts"}),
    fs      = require('fs'),
    app     = null,

    config  = {
      layout: 'index.html',
      dir: __dirname + '/templates',
    };


  // var templates = fs.readdirSync(config.dir),
  //     data = {
  //       templates: []
  //     };

  // templates.forEach(function(e){
  //   if (e===config.layout) {
  //     return;
  //   }
  //   var str = fs.readFileSync(config.dir + '/' + e, {encoding: 'utf8'}),
  //       id = e.replace(/\.html$/, '');
  //   data.templates.push({
  //     "id": id,
  //     "content": str
  //   });
  // });

  var result = dot.web({name: 'Alex', dt: (new Date()).toDateString(), str: 'hola'});
console.log('hola');
  app = express();
  app.use(express.static(__dirname + '/public'));
  app.use(app.router);

  app.get("/", function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(result);
  });

  app.listen(3000);
