import { API_URL, TOKEN_API } from './config';
import { searchArtists, searchAlbums, searchTracks, searchPlaylists}  from './search';
import { getAlbum, getAlbums, getAlbumTracks } from './album';
import { toJSON } from './utils';


/*module.exports = { 
    searchArtists, searchAlbums, searchTracks, searchPlaylists, getAlbum, getAlbums, getAlbumTracks
}*/

export default class Spotifywrapper {
    constructor(option) {
        this.apiURL = option.apiURL || API_URL;
        this.token = option.token
    }

    request(url) {
        const headers = {
            headers: {
                Authorization: `'Bearer ${this.token}'`,
            },
        };
        return fetch(url, headers).then(toJSON);
    }

}

