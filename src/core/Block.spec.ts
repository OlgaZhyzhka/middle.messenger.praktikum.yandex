import { expect } from 'chai'; 
import sinon from 'sinon';
import Block from './Block';

describe('Block', () => {
    let block: Block;

    beforeEach(() => {
      block = new Block({});
    });

    afterEach(() => {
      block.destroy();
    });

    // it('should create an instance of Block', () => {
    //   expect(block).to.be.an.instanceOf(Block);
    // });

    // it('should have a valid element property', () => {
    //   expect(block.element).to.be.null;
    // });

    // it('should have a valid id property', () => {
    //   expect(block.id).to.be.a('string');
    // });

    // it('should have a valid props property', () => {
    //   expect(block.getProps()).to.be.an('object');
    // });

    // it('should have a valid getChild method', () => {
    //   expect(block.getChild).to.be.a('function');
    // });

    // it('should have a valid getChildItems method', () => {
    //   expect(block.getChildItems).to.be.a('function');
    // });

    // it('should have a valid filterContacts method', () => {
    //   expect(block.filterContacts).to.be.a('function');
    // });

    // it('should have a valid render method', () => {
    //   expect(block.render).to.be.a('function');
    // });

    // it('should have a valid componentDidMount method', () => {
    //   expect(block.componentDidMount).to.be.a('function');
    // });

    // it('should have a valid componentWillUnmount method', () => {
    //   expect(block.componentWillUnmount).to.be.a('function');
    // });

    // it('should have a valid destroy method', () => {
    //   expect(block.destroy).to.be.a('function');
    // });

    // it('should have a valid componentDidUpdate method', () => {
    //   expect(block.componentDidUpdate).to.be.a('function');
    // });

    // it('should have a valid toggleClass method', () => {
    //   expect(block.toggleClass).to.be.a('function');
    // });

    // it('should have a valid setProps method', () => {
    //   expect(block.setProps).to.be.a('function');
    // });

    // it('should have a valid compile method', () => {
    //   expect(block.compile).to.be.a('function');
    // });

    // it('should have a valid show method', () => {
    //   expect(block.show).to.be.a('function');
    // });

    // it('should have a valid hide method', () => {
    //   expect(block.hide).to.be.a('function');
    // });
});