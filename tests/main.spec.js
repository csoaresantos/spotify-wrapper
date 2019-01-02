import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
chai.use(sinonChai);

global.fetch = require('node-fetch');

import { search, searchAlbums, searchArtists, searchTracks, searchPlaylists } from '../src/main';

describe('Spotify Wrapper', () => {
    let fetchedStub;
    let promise;

    beforeEach(()=> {
        fetchedStub = sinon.stub(global, 'fetch');
        promise = fetchedStub.resolves({ json: () => {} });
    });

    afterEach(()=>{
        fetchedStub.restore();
    });

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

    describe('Generic Search', () => {

        it('Should call fetch function', () => {
            const artist = search();
            expect(fetchedStub).to.have.been.calledOnce;
        });

        it('should call fetch with the correct url ', ()=>{
            context('passing one type', () =>{
                const artist = search('Incubus','artist');
                expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Incubus&type=artist');
        
                const albums = search('Incubus','album');
                expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Incubus&type=album');
            });

            context('passing more than one type', () => {
                const artistsAndAlbums = search('Incubus',['artist','album']);
                expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Incubus&type=artist,album');
            });
        });

        it('should return a JSON', ()=>{
            promise.resolves({ body: 'json' });
            const artist = search('Incubus','artist');
            artist.then((data) => {
                expect(data).to.be.eql({ bady: 'json' });
            });
        });

    });

    describe('searchArtists', ()=> {
        it('should call fethc function', ()=> {
            const artist = searchArtists('Metallica');
            expect(fetchedStub).to.have.been.calledOnce;
        });

        it('should be called with the correct URL', ()=> {
            const artist = searchArtists('Metallica');
            expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Metallica&type=artist');

            const artist2 = searchArtists('Slipknot');
            expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Slipknot&type=artist');
        });
    });

    describe('searchAlbums', ()=> {
        it('should call fethc function', ()=> {
            const albums = searchAlbums('load');
            expect(fetchedStub).to.have.been.calledOnce;
        });

        it('should be called with the correct URL', ()=> {
            const artist = searchAlbums('load');
            expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=load&type=album');

            const artist2 = searchAlbums('reload');
            expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=reload&type=album');
        });
    });

    describe('search track', ()=> {
        it('should call fethc function', ()=> {
            const val = searchTracks('mama');
            expect(fetchedStub).to.have.been.calledOnce;
        });

        it('should be called with the correct URL', ()=> {
            const val = searchTracks('mama');
            expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=mama&type=track');

            const val2 = searchTracks('sair');
            expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=sair&type=track');
        });
    });

    describe('search playlist', ()=> {
        it('should call fethc function', ()=> {
            const val = searchPlaylists('playlist');
            expect(fetchedStub).to.have.been.calledOnce;
        });

        it('should be called with the correct URL', ()=> {
            const val = searchPlaylists('metal');
            expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=metal&type=playlist');

            const val2 = searchPlaylists('pesado');
            expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=pesado&type=playlist');
        });
    });
});
