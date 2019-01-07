import {toJSON} from './utils';

export const getAlbum = (album) => fetch(`https://api.spotify.com/v1/albums/${album}`)
.then(toJSON);

export const getAlbums = id => fetch(`https://api.spotify.com/v1/albums/?ids=${id}`).then(toJSON);

export const getAlbumTracks = id => fetch(`https://api.spotify.com/v1/albums/${id}/tracks`).then(toJSON);
