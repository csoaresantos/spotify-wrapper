import { API_URL, TOKEN_API } from './config';
import { searchArtists, searchAlbums, searchTracks, searchPlaylists}  from './search';
import album from './album';
import search from  './search';
import { toJSON } from './utils';

export default class Spotifywrapper {
    constructor(option) {
        this.apiURL = option.apiURL || API_URL;
        this.token = option.token
        this.album = album.bind(this)();
        this.search = search.bind(this)();
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

