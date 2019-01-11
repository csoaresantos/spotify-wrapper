'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAlbumTracks = exports.getAlbums = exports.getAlbum = undefined;

var _utils = require('./utils');

var getAlbum = exports.getAlbum = function getAlbum(album) {
  return fetch('https://api.spotify.com/v1/albums/' + album).then(_utils.toJSON);
};

var getAlbums = exports.getAlbums = function getAlbums(id) {
  return fetch('https://api.spotify.com/v1/albums/?ids=' + id).then(_utils.toJSON);
};

var getAlbumTracks = exports.getAlbumTracks = function getAlbumTracks(id) {
  return fetch('https://api.spotify.com/v1/albums/' + id + '/tracks').then(_utils.toJSON);
};