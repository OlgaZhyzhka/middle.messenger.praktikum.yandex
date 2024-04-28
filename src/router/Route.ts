import Block from '@/core/Block.ts';
import { renderDOM } from '@/helpers/index.ts';
import { isEqual } from '@/helpers/isEqual';
import { RouteOptionsWithProps } from './interfaces';

class Route {
  private _pathname: string;

  private _blockConstructor: typeof Block;

  private _block: Block | null = null;

  private _props: RouteOptionsWithProps;

  constructor(pathname: string, blockConstructor: typeof Block, props: RouteOptionsWithProps) {
    this._pathname = pathname;
    this._blockConstructor = blockConstructor;
    this._props = props;
  }

  public navigate(pathname: string): void {
    if (this.match(pathname)) {
      this._pathname = pathname;
      this.render();
    }
  }

  public leave(): void {
    this._block?.hide();
  }

  public match(pathname: string): boolean {
    return isEqual(pathname, this._pathname);
  }

  public render(): void {
    if (this._props.title) {
      document.title = this._props.title;
    }

    if (!this._block) {
      this._block = new this._blockConstructor(this._props.props ? this._props.props : {});
      renderDOM(this._block, this._props.rootQuery);
      return;
    }

    this._block.show();
  }
}

export default Route;
