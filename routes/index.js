var _ = require('lodash');
var express = require('express');
var Promise = require('bluebird');  
var router = express.Router();
var albumArt = require('album-art');
var tpb = require('thepiratebay');
var library = require('../library.json');

function getArt(album) {
  return new Promise(function(resolve, reject) {
    albumArt(album.artist, album.album, 'mega', function(err, url) {
      if (err) {
        return reject(err);
      }
      resolve(url);
    });
  });
}

function getMagnetLink(album) {
  return tpb.search(album.artist + ' ' + album.album, {
    category: '100'
  }).then(function(results) {
    return results[0].magnetLink;
  });
}

/* GET home page. */
router.get('/', function(req, res, next) {
  var allArt = _.map(library.albums, getArt);
  var art = [];
  Promise.all(allArt)
    .then(function(urls) {
      art = urls;
      return _.map(library.albums, getMagnetLink);
    })
    .all().then(function(urls){
      res.render('index', { albums: library.albums, art: art, magnets: urls });
    });
});

module.exports = router;
