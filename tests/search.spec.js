import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
chai.use(sinonChai);

global.fetch = require('node-fetch');

import Spotifywrapper from '../src/index';

describe('Spotify Wrapper', () => {
    let fetchedStub;
    let promise;
    let spotify

    beforeEach(()=> {
        spotify = new Spotifywrapper({
            token: 'foo'
        });
        fetchedStub = sinon.stub(global, 'fetch');
        promise = fetchedStub.resolves({ json: () => {} });
    });

    afterEach(()=>{
        fetchedStub.restore();
    });

    describe('smoke test', () => {
        it('should exists searchAlbums method',() => {
            expect(spotify.search.albums).to.exist;
        });

        it('should exists searchArtits method',() => {
            expect(spotify.search.artists).to.exist;
        });

        it('should exists searchTracks method',() => {
            expect(spotify.search.tracks).to.exist;
        });

        it('should exists search searchPlaylists',() => {
            expect(spotify.search.playlists).to.exist;
        });
    });

    describe('searchArtists', ()=> {
        it('should call fethc function', ()=> {
            const artist = spotify.search.artists('Metallica');
            expect(fetchedStub).to.have.been.calledOnce;
        });

        it('should be called with the correct URL', ()=> {
            const artist = spotify.search.artists('Metallica');
            expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Metallica&type=artist');

            const artist2 = spotify.search.artists('Slipknot');
            expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Slipknot&type=artist');
        });
    });

    describe('searchAlbums', ()=> {
        it('should call fethc function', ()=> {
            const albums = spotify.search.albums('load');
            expect(fetchedStub).to.have.been.calledOnce;
        });

        it('should be called with the correct URL', ()=> {
            const artist = spotify.search.albums('load');
            expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=load&type=album');

            const artist2 = spotify.search.albums('reload');
            expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=reload&type=album');
        });
    });

    describe('search track', ()=> {
        it('should call fethc function', ()=> {
            const val = spotify.search.tracks('mama');
            expect(fetchedStub).to.have.been.calledOnce;
        });

        it('should be called with the correct URL', ()=> {
            const val = spotify.search.tracks('mama');
            expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=mama&type=track');

            const val2 = spotify.search.tracks('sair');
            expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=sair&type=track');
        });
    });

    describe('search playlist', ()=> {
        it('should call fethc function', ()=> {
            const val = spotify.search.playlists('playlist');
            expect(fetchedStub).to.have.been.calledOnce;
        });

        it('should be called with the correct URL', ()=> {
            const val = spotify.search.playlists('metal');
            expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=metal&type=playlist');

            const val2 = spotify.search.playlists('pesado');
            expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=pesado&type=playlist');
        });
    });
});
