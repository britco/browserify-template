module.exports = function(file, opts) {
  var _ = require('lodash'),
  template = _.template,
  through = require('through2')
  
  // path.extname via https://github.com/substack/path-browserify/blob/master/index.js
  
  // Split a filename into [root, dir, basename, ext], unix version
  // 'root' is just a slash, or nothing.
  var splitPathRe = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/
  var splitPath = function(filename) {
    return splitPathRe.exec(filename).slice(1)
  };
  var extname = function(path) {
    return splitPath(path)[3]
  };
  
  // Check if extension matches if the option is provided
  var fileExt = extname(file)
  if(opts.extensions && opts.extensions.indexOf(fileExt) === -1) {
    return through()
  }
    
  opts = _.defaults(opts || {}, {data: {}})

  // Transform the data!
  return through(function(buf, enc, next) {
    try {
      var tpl = template(buf.toString('utf8'))
      var transformed = tpl(opts.data)
    } catch(e) {
       this.emit('error',e)
    }
    this.push(transformed)
    next()
  });
};
