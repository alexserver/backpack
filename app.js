var connect     = require('connect'),
    router      = require('connect-route'),
    handlebars  = require('handlebars'),
    fs          = require('fs'),
    path        = require('path'),
    app         = null,
    routes      = null,

    config  = {
      layout      : path.join(__dirname,'/views/layouts/main.html'),
      templates   : path.join(__dirname,'/views/templates'),
      port        : 3000
    };

var getTemplates = function() {
  var templates     = [],
      templateFiles = fs.readdirSync(config.templates);

  templates = templateFiles.map(function(e){
    var str = fs.readFileSync(path.join(config.templates, e), {encoding: 'utf8'});
    return {
      "id": e.replace(/\.html$/, ''), //converts "demo.html" into "demo"
      "content" : str
    };
  });
  return templates;
};

routes = router(function(r){

  r.get('/', function(req, res, next){
    var source, template, layout;
    source = fs.readFileSync(config.layout, 'utf8');
    template = handlebars.compile(source);
    layout = template({
      templates: getTemplates()
    });
    //server the layout.
    res.end(layout);
  });

});

app = connect();
app
    .use(connect.static('public/'))
    .use(routes)
    .listen(config.port);


