import { expect } from 'chai';
import { search, searchAlbums, searchArtists, searchTracks, searchPlaylists } from '../src/main';

describe('Spotify Wrapper', () => {
    describe('smoke test', () => {
        it('should exists search method',() => {
            expect(search).to.exist;
           });

           it('should exists searchAlbums method',() => {
            expect(searchAlbums).to.exist;
           });

           it('should exists searchArtits method',() => {
            expect(searchArtists).to.exist;
           });

           it('should exists searchTracks method',() => {
            expect(searchTracks).to.exist;
           });

           it('should exists search searchPlaylists',() => {
            expect(searchPlaylists).to.exist;
           });
    });

});
