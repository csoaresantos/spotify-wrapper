import { expect } from 'chai';
import { search} from '../src/main';

describe('Spotify Wrapper', () => {
    describe('smoke test', () => {
       it('should exists search method',() => {
        expect(search).to.exist;
       });
    });

});
