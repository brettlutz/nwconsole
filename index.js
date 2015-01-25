var fs      = require('fs'),
    util    = require('util'),
    os      = require('os'),
    path    = require('path'),
    gui = global.window.nwDispatcher.requireNwGui();


var console = {};

var log_file_path = path.join(os.tmpdir(), gui.App.manifest.name + '.log'),
    log_file      = fs.createWriteStream(log_file_path, {flags : 'a'});

var _log = function(level, args) {
  var date = new Date();
  level =  ("      " + level).slice(-5);
  log_file.write("[" + level + ' ' + date.toISOString() + "] " + util.format.apply(null, args) + '\n');
}
console.log = function(message) {
  _log("info", [].slice.apply(arguments));
};

console.error = function(d) {
  if(d.stack) //or is a error
    _log("error", [d.stack.toString()]);
  else
    _log("error", [].slice.apply(arguments));
};

module.exports = console;