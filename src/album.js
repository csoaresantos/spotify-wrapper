import {toJSON} from './utils';
import { API_URL, HEADERS} from './config';

export const getAlbum = (album) => fetch(`https://api.spotify.com/v1/albums/${album}`, HEADERS)
.then(toJSON);

export const getAlbums = id => fetch(`https://api.spotify.com/v1/albums/?ids=${id}`, HEADERS).then(toJSON);

export const getAlbumTracks = id => fetch(`https://api.spotify.com/v1/albums/${id}/tracks`, HEADERS).then(toJSON);
