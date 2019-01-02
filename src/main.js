export const search = (query, type) =>
    fetch(`https://api.spotify.com/v1/search?q=${query}&type=${type}`)
    .then(data => data.json());

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
