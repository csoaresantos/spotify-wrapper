import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import sinonStubPromise from 'sinon-stub-promise';
chai.use(sinonChai);
sinonStubPromise(sinon);

global.fetch = require('node-fetch');

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

    describe('Generic Search', () => {
        let fetchedStub;

        beforeEach(()=> {
            fetchedStub = sinon.stub(global, 'fetch');
        });
    
        afterEach(()=>{
            fetchedStub.restore();
        });

        it('Should call fetch function', () => {
            const artist = search();
            expect(fetchedStub).to.have.been.calledOnce;
        });

        it('should call fetch with the correct url ', ()=>{
            context('passing one type', ()=>{
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

    });

});
