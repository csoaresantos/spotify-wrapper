import chai, { expect } from 'chai';
import { getAlbum, getAlbums, getAlbumTracks } from '../src/album';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import {API_URL} from '../src/config';
chai.use(sinonChai);

global.fetch = require('node-fetch');

describe('Album', () => {
    describe('smoke test', () => {
        it('should exists getAlbum', ()=> {
            expect(getAlbum).to.exist;
        });

        it('should exists getAlbumTracks', ()=> {
            expect(getAlbumTracks).to.exist;
        });
    });

    let stubedFetch;
    let promise;

    beforeEach(()=>{
        stubedFetch = sinon.stub(global, 'fetch');
        promise = stubedFetch.resolves({ json: () => ({ album: 'name' }) });
    });

    afterEach(() => {
        stubedFetch.restore();
    });

    describe('getAlbum', ()=> {
        it('should call getAlbum fetch', ()=> {
            const sarchAlbum = getAlbum();

            expect(stubedFetch).to.have.calledOnce;
        });

        it('should have called with url', ()=> {
            const sarchAlbum = getAlbum('4aawyAB9vmqN3uQ7FjRGTy');
            expect(stubedFetch).to.have.calledWith(`${API_URL}/albums/4aawyAB9vmqN3uQ7FjRGTy`);
        });

        it('should return the correct data', ()=> {
            promise.resolves({ album: 'name'});
            const searchAlbum = getAlbum('4aawyAB9vmqN3uQ7FjRGTy');
            searchAlbum.then((data) => expect(data).to.be.equal({ album: 'name'}));
        });
    });

    describe('getAlbums', ()=> {
        it('should call getAlbums fetch', ()=> {
            const albums = getAlbums(['4aawyAB9vmqN3uQ7FjRGTy', '4aawyAB9vmqN3uQ7FjRGTd']);
            expect(stubedFetch).to.have.calledOnce;
        });

        it('should call method with correct url', ()=> {
            const albums = getAlbums(['4aawyAB9vmqN3uQ7FjRGTy', '4aawyAB9vmqN3uQ7FjRGTd']);
            expect(stubedFetch).to.have.calledWith(`${API_URL}/albums/?ids=4aawyAB9vmqN3uQ7FjRGTy,4aawyAB9vmqN3uQ7FjRGTd`);
        });
    });

    describe('getAlbumsTracks', () => {
        it('should call fetch method', () => {
          const tracks = getAlbumTracks();
          expect(stubedFetch).to.have.been.calledOnce;
        });
    
        it('should call fetch with the correct URL', () => {
          const tracks = getAlbumTracks('4aawyAB9vmqN3uQ7FjRGTy');
          expect(stubedFetch).to.have.been
            .calledWith(`${API_URL}/albums/4aawyAB9vmqN3uQ7FjRGTy/tracks`);
        });
    
        it('should return the correct data from Promise', () => {
          const tracks = getAlbumTracks('4aawyAB9vmqN3uQ7FjRGTy');
          tracks.then((data) => {
            expect(data).to.be.eql({ album: 'name'});
          });
        });
      });
});