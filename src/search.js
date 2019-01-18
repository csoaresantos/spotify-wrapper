import {toJSON} from './utils';
import {API_URL, HEADERS} from './config';

export const search = (query, type) =>
    fetch(`${API_URL}/search?q=${query}&type=${type}`, HEADERS)
    .then(toJSON);

export const searchArtists = function(query) {
    return  search(query, 'artist');
}

export const searchAlbums = function(query) {
    return  search(query, 'album');
}

export const searchTracks = function(query) {
    return  search(query, 'track');
}

export const searchPlaylists = function(query) {
    return  search(query, 'playlist');
}
