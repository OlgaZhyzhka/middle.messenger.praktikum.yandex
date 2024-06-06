import { expect } from 'chai';
import sinon from 'sinon';

import Block, { Props } from '@/core/Block';
import { Router } from './Router';

let TestBlockClass: typeof Block;

describe('Router', () => {
  let router: Router;

  before(() => {
    class TestBlock extends Block {
      constructor(props: Props) {
        super({ ...props });
      }

      public render(): DocumentFragment {
        return this.compile('Test page');
      }
    }

    TestBlockClass = TestBlock;
  });

  beforeEach(() => {
    router = Router.getInstance();
    history.replaceState({}, '', '/');
  });

  it('should navigate to a new route', () => {
    router.use('/test', TestBlockClass);
    router.go('/test');
    expect(window.location.pathname).to.equal('/test');
  });

  it('should call window.history.back when back is called', () => {
    const backStub = sinon.stub(window.history, 'back');
    router.back();
    /* eslint-disable @typescript-eslint/no-unused-expressions */
    expect(backStub.calledOnce).to.be.true;
    backStub.restore();
  });

  it('should call window.history.forward when forward is called', () => {
    const forwardStub = sinon.stub(window.history, 'forward');
    router.forward();
    /* eslint-disable @typescript-eslint/no-unused-expressions */
    expect(forwardStub.calledOnce).to.be.true;
    forwardStub.restore();
  });
});
