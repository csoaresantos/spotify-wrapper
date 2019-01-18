import chai, { expect } from 'chai';
import Spotifywrapper from '../src/index';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import {API_URL} from '../src/config';
chai.use(sinonChai);

global.fetch = require('node-fetch');

describe('Spotifywrapper Library', ()=> {
    it('should create an instance of Spotifywrapper library', () => {
        let spotify = new Spotifywrapper({});
        expect(spotify).to.be.an.instanceof(Spotifywrapper);
    });

    it('Should receive a url as an option', () => {
        let spotify = new Spotifywrapper({
            apiURL: 'apiUrl'
        });
        expect(spotify.apiURL).to.be.equal('apiUrl');
    });

    it('Should use default url if not provided', () => {
        let spotify = new Spotifywrapper({});
        expect(spotify.apiURL).to.be.equal(API_URL);
    });

    it('Should receive a token as an option', () => {
        let spotify = new Spotifywrapper({ token: 'foo'});
        expect(spotify.token).to.be.equal('foo');
    });

    describe('Request method', () => {
        let stubedFetch;
        let promise;
    
        beforeEach(()=>{
            stubedFetch = sinon.stub(global, 'fetch');
            promise = stubedFetch.resolves({ json: () => ({ album: 'name' }) });
        });
    
        afterEach(() => {
            stubedFetch.restore();
        });

        it('should have request method', () => {
            let spotify = new Spotifywrapper({ token: 'foo'});
            expect(spotify.request).to.be.exist;
        });

        it('should call request method when exist', () => {
            let spotify = new Spotifywrapper({ token: 'foo'});
            spotify.request('url');
            expect(stubedFetch).to.have.been.calledOnce;
        });

        it('should call with correct url', () => {
            let spotify = new Spotifywrapper({ token: 'foo'});
            spotify.request('url');
            expect(stubedFetch).to.have.been.calledWith('url');           
        });

        it('should call with the right headers passed', () => {
            let spotify = new Spotifywrapper({ token: 'foo'});
            
            const headers = {
                headers: {
                    Authorization: `'Bearer foo'`,
                },
            };

            spotify.request('url');
            expect(stubedFetch).to.have.been.calledWith('url', headers);
        });
    });
});