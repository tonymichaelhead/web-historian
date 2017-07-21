var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');

exports.headers = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10, // Seconds.
  'Content-Type': 'text/html'
};

exports.sendRedirect = function() {

};

exports.serveAssets = function(res, asset, callback) {
  var encoding = {encoding: 'utf-8'};
  
};
exports.collectData = function(request, callback) {

}



// As you progress, keep thinking about what helper functions you can put here!
