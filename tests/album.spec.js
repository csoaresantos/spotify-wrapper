import chai, { expect } from 'chai';
import { getAlbum, getAlbums, getAlbumTracks } from '../src/album';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import {API_URL} from '../src/config';
chai.use(sinonChai);

global.fetch = require('node-fetch');
import Spotifywrapper from '../src/index';

describe('Album', () => {
    let stubedFetch;
    let promise;
    let spotify;

    beforeEach(()=>{
        spotify = new Spotifywrapper({ token: 'foo'});
        stubedFetch = sinon.stub(global, 'fetch');
        promise = stubedFetch.resolves({ json: () => ({ album: 'name' }) });
    });

    afterEach(() => {
        stubedFetch.restore();
    });

    describe('smoke test', () => {
        it('should exists getAlbum', ()=> {
            expect(spotify.album.getAlbum).to.exist;
        });

        it('should exists getAlbumTracks', ()=> {
            expect(spotify.album.getTrack).to.exist;
        });
    });

    describe('getAlbum', ()=> {
        it('should call getAlbum fetch', ()=> {
            const sarchAlbum = spotify.album.getAlbum();

            expect(stubedFetch).to.have.been.calledOnce;
        });

        it('should have called with url', ()=> {
            const sarchAlbum = spotify.album.getAlbum('4aawyAB9vmqN3uQ7FjRGTy');
            expect(stubedFetch).to.have.calledWith(`${API_URL}/albums/4aawyAB9vmqN3uQ7FjRGTy`);
        });

        it('should return the correct data', ()=> {
            promise.resolves({ album: 'name'});
            const searchAlbum = spotify.album.getAlbum('4aawyAB9vmqN3uQ7FjRGTy');
            searchAlbum.then((data) => expect(data).to.be.equal({ album: 'name'}));
        });
    });

    describe('getAlbums', ()=> {
        it('should call getAlbums fetch', ()=> {
            const albums = spotify.album.getAlbums(['4aawyAB9vmqN3uQ7FjRGTy', '4aawyAB9vmqN3uQ7FjRGTd']);
            expect(stubedFetch).to.have.calledOnce;
        });

        it('should call method with correct url', ()=> {
            const albums = spotify.album.getAlbums(['4aawyAB9vmqN3uQ7FjRGTy', '4aawyAB9vmqN3uQ7FjRGTd']);
            expect(stubedFetch).to.have.calledWith(`${API_URL}/albums/?ids=4aawyAB9vmqN3uQ7FjRGTy,4aawyAB9vmqN3uQ7FjRGTd`);
        });
    });

    describe('getAlbumsTracks', () => {
        it('should call fetch method', () => {
          const tracks = spotify.album.getTrack();
          expect(stubedFetch).to.have.been.calledOnce;
        });
    
        it('should call fetch with the correct URL', () => {
          const tracks = spotify.album.getTrack('4aawyAB9vmqN3uQ7FjRGTy');
          expect(stubedFetch).to.have.been
            .calledWith(`${API_URL}/albums/4aawyAB9vmqN3uQ7FjRGTy/tracks`);
        });
    
        it('should return the correct data from Promise', () => {
          const tracks = spotify.album.getTrack('4aawyAB9vmqN3uQ7FjRGTy');
          tracks.then((data) => {
            expect(data).to.be.eql({ album: 'name'});
          });
        });
      });
});