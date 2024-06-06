import { expect } from 'chai';
import sinon from 'sinon';

import Block, { Props } from './Block';
import { renderDOM } from '@/helpers';

describe('Block', () => {
  let TestBlockClass: typeof Block;

  before(() => {
    class TestBlock extends Block {
      constructor(props: Props) {
        super({ ...props });
      }

      public render(): DocumentFragment {
        const tpl = `<div><span id="testText">{{testText}}</span><button id="testButton">{{ testButton }}</button></div>`;
        return this.compile(tpl);
      }
    }

    TestBlockClass = TestBlock;
  });

  it('should create instance of Block and state from constructor', () => {
    const testText = 'Test text';
    const testButton = 'Test button';
    const block = new TestBlockClass({ testText, testButton });

    const textElement = block.element?.querySelector('#testText');
    const textInBlock = textElement?.textContent;

    expect(block).to.be.instanceOf(Block);
    expect(textInBlock).to.be.eq(testText);
  });

  it('should update when props change', () => {
    const testText = 'New text';
    const block = new TestBlockClass({ testText: 'Old text', testButton: 'Old button' });
    block.setProps({ testText });

    const textElement = block.element?.querySelector('#testText');
    const textInBlock = textElement?.textContent;

    expect(textInBlock).to.be.eq(testText);
  });

  it('should call event listener', () => {
    const onClick = sinon.stub();
    const block = new TestBlockClass({ events: { click: onClick } });
    const blockElement = block.element;
    blockElement?.dispatchEvent(new Event('click'));
    /* eslint-disable @typescript-eslint/no-unused-expressions */
    expect(onClick.calledOnce).to.be.true;
  });

  it('should call dispatchComponentDidMount after render component', () => {
    const block = new TestBlockClass({});
    const dispatchComponentDidMountStub = sinon.stub(block, 'dispatchComponentDidMount');

    renderDOM(block, '#test-root');
    /* eslint-disable @typescript-eslint/no-unused-expressions */
    expect(dispatchComponentDidMountStub.calledOnce).to.be.true;
    dispatchComponentDidMountStub.restore();
   });
});
