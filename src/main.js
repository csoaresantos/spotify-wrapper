export const search = function(query, type) {
    return fetch(`https://api.spotify.com/v1/search?q=${query}&type=${type}`);
}

export const searchAlbums = function() {
    return 1;
}

export const searchArtists = function() {
    return 1;
}

export const searchTracks = function() {
    return 1;
}

export const searchPlaylists = function() {
    return 1;
}
