var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');
var Promise = require('bluebird');

exports.headers = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10, // Seconds.
  'Content-Type': 'text/html'
};

exports.sendRedirect = function(response, location, status) {
  status = status || 302;
  response.writeHead(status, {Location: location});
  response.end();
};

var readFile = Promise.promisify(fs.readFile);

exports.serveAssets = function(res, asset, callback) {
  var encoding = {encoding: 'utf-8'};

  return readFile(archive.paths.siteAssets + asset, encoding)
    .then(contents => {
      contents && exports.SendResponse(res, contents);
    })
    .catch(err => {
      return readFile(archive.paths.archivedSites + asset, encoding);
    })
    then(contents => {
      contents && exports.SendResponse(res, contents);
    })
    .catch(err => {
      callback ? callback() : exports.send404(res);
    });

};
exports.collectData = function(request, callback) {
  var data = '';
  request.on('data', chunk => {
    data += chunk;
  });
  request.on('end', () => {
    callback(data);
  });
};

exports.send404 = function(response) {
  exports.sendResponse(response, '404: Page not found', 404);
};



// As you progress, keep thinking about what helper functions you can put here!
