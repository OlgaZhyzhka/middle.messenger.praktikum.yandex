// import { expect } from 'chai'; 
// import sinon from 'sinon';
import Block from './Block';

describe('Block', () => {
    let block: Block;

    beforeEach(() => {
      block = new Block({});
    });

    afterEach(() => {
      block.destroy();
    });
});