import Handlebars from 'handlebars';

import { generateUniqueId } from '@/helpers';
import { isEqual } from '@/helpers/isEqual';
import { EventCallback } from '@/utils/types';

import EventBus from './EventBus';

Handlebars.registerHelper('eq', (a, b) => a === b);

export interface Props {
  [key: string]: unknown;
  settings?: {
    withInternalId: boolean;
  };
  events?: { [key: string]: EventCallback };
  attributes?: { [key: string]: string | boolean };
}

interface Children {
  [key: string]: Block;
}

interface ChildItems {
  [key: string]: Block[];
}

interface SeparatedProps {
  props: Props;
  children: Children;
  childItems: ChildItems;
}

export default class Block {
  protected static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
  };

  protected props: Props;

  protected children: Children;

  protected childItems: ChildItems;

  protected eventBus: EventBus;

  protected _element: HTMLElement | null = null;

  private _meta: { tagName: string } | null = null;

  private _id: string;

  private _isUpdated = false;

  constructor(propsWithChildren: Props, tagName: string = 'div') {
    const { childItems, children, props } = this._separateProps(propsWithChildren);

    this.eventBus = new EventBus();
    this._id = generateUniqueId();
    const {
      props: propsProxy,
      children: childrenProxy,
      childItems: childItemsProxy,
    } = this._makePropsProxy({ ...props, __id: this._id }, children, childItems);
    this.props = propsProxy;
    this.children = childrenProxy;
    this.childItems = childItemsProxy;
    this._meta = {
      tagName,
    };
    this._registerEvents();
    this.eventBus.emit(Block.EVENTS.INIT);
  }

  public get element(): HTMLElement | null {
    return this._element;
  }

  protected get id(): string {
    return this._id;
  }

  public getProps(): Props {
    return this.props;
  }

  public getChild(name: string): Block | undefined {
    return this.children[name];
  }

  private _registerEvents(): void {
    this.eventBus.on(Block.EVENTS.INIT, this._init.bind(this));
    this.eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    this.eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    this.eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  private _separateProps(propsWithChildren: Props): SeparatedProps {
    const props: Props = {};
    const children: Children = {};
    const childItems: ChildItems = {};

    Object.entries(propsWithChildren).forEach(([key, value]) => {
      if (value instanceof Block) {
        children[key] = value;
      } else if (Array.isArray(value)) {
        childItems[key] = value;
      } else {
        props[key] = value;
      }
    });

    return { props, children, childItems };
  }

  private _makePropsProxy(
    props: Props,
    children: Children,
    childItems: ChildItems
  ): { props: Props; children: Children; childItems: ChildItems } {
    const propsProxy = new Proxy(props, {
      get: (target, prop: string): unknown => {
        const value = target[prop];
        return typeof value === 'function' ? value.bind(target) : value;
      },
      set: (target, prop: string, value): boolean => {
        console.log(`Setting prop ${prop} to`, value);
        if (!isEqual(target[prop], value)) {
          target[prop] = value;
          this._isUpdated = true;
          this.eventBus.emit(Block.EVENTS.FLOW_CDU);
        }
        return true;
      },
    });

    const childrenProxy = new Proxy(children, {
      get: (target, prop: string): unknown => {
        /* eslint-disable @typescript-eslint/no-explicit-any */
        const value = target[prop] as any;
        return typeof value === 'function' ? value.bind(target) : value;
      },
      set: (target, prop: string, value): boolean => {
        if (!isEqual(target[prop], value)) {
          target[prop] = value;
          this._isUpdated = true;
          this.eventBus.emit(Block.EVENTS.FLOW_CDU);
        }
        return true;
      },
    });

    const childItemsProxy = new Proxy(childItems, {
      get: (target, prop: string): unknown => {
        /* eslint-disable @typescript-eslint/no-explicit-any */
        const value = target[prop] as any;
        return typeof value === 'function' ? value.bind(target) : value;
      },
      set: (target, prop: string, value): boolean => {
        if (!isEqual(target[prop], value)) {
          target[prop] = value;
          this._isUpdated = true;
          this.eventBus.emit(Block.EVENTS.FLOW_CDU);
        }
        return true;
      },
    });

    return { props: propsProxy, children: childrenProxy, childItems: childItemsProxy };
  }

  protected _init(): void {
    const tagName = this._meta?.tagName || 'div';
    this._element = this._createDocumentElement(tagName);

    this.init();

    this.eventBus.emit(Block.EVENTS.FLOW_RENDER);
  }

  protected init(): void {}

  private _createDocumentElement(tagName: string): HTMLElement {
    const element = document.createElement(tagName);

    if (this.props.settings?.withInternalId) {
      element.dataset.id = this._id;
    }

    return element;
  }

  private _render(): void {
    const fragment: DocumentFragment = this.render();

    if (this._element) {
      this._removeEvents();
      this._element.innerHTML = '';
    }

    this._element?.append(fragment);
    this._addEvents();

    const { attributes } = this.props;
    this._setAttribute(attributes);
    console.log('Render element');
  }

  /* eslint-disable @typescript-eslint/no-explicit-any */
  public render(): any {}

  public getContent(): HTMLElement | null {
    return this.element;
  }

  private _componentDidMount(): void {
    this.componentDidMount();
    Object.values(this.children).forEach((child) => {
      if (child instanceof Block) {
        child.dispatchComponentDidMount();
      }
    });
    Object.values(this.childItems).forEach((items) => {
      items.forEach((item) => {
        if (item instanceof Block) {
          item.dispatchComponentDidMount();
        }
      });
    });
  }

  protected componentDidMount(oldProps?: Props): void {
    console.log(`Component ${this._meta?.tagName} mounted with props:`, oldProps);
  }

  public dispatchComponentDidMount(): void {
    this.eventBus.emit(Block.EVENTS.FLOW_CDM);
  }

  protected componentWillUnmount(): void {
    if (this._element instanceof HTMLElement) {
      this._element.remove();
    }

    this._element = null;
  }

  public remove(): void {
    this.componentWillUnmount();
  }

  private _componentDidUpdate(oldProps: Props, newProps: Props): void {
    if (!oldProps || !newProps) {
      return;
    }

    const response = this.componentDidUpdate(oldProps, newProps);

    if (response) {
      this.eventBus.emit(Block.EVENTS.FLOW_RENDER);
    }
  }

  protected componentDidUpdate(oldProps: Props, newProps: Props): boolean {
    console.log(`Component ${this._meta?.tagName} updated with props:`, oldProps, newProps);
    return true;
  }

  private _setAttribute(attributes: Record<string, string | boolean> = {}): void {
    Object.entries(attributes).forEach(([key, value]) => this._element?.setAttribute(key, String(value)));
  }

  public toggleClass(className: Record<string, string>): void {
    const key = className.class;

    if (this.element?.classList.contains(key)) {
      this.element?.classList.remove(key);
    }

    this.element?.classList.add(key);
  }

  private _addEvents(): void {
    const { events = {} } = this.props as Props & { events: Record<string, () => void> };

    Object.keys(events).forEach((event) => {
      this._element?.addEventListener(event, events[event]);
    });
  }

  private _removeEvents(): void {
    const { events = {} } = this.props as Props & { events: Record<string, () => void> };

    if (!events || !this._element) {
      return;
    }

    Object.keys(events).forEach((event) => {
      this._element?.removeEventListener(event, events[event]);
    });
  }

  public setProps = (nextProps: Props): void => {
    if (!nextProps) {
      return;
    }

    this._isUpdated = false;
    const oldProps = { ...this.props };

    const { children, childItems, props } = this._separateProps(nextProps);

    if (Object.keys(children).length) {
      Object.assign(this.children, children);
    }

    if (Object.keys(props).length) {
      Object.assign(this.props, props);
    }

    if (Object.keys(childItems).length) {
      Object.assign(this.childItems, childItems);
    }

    if (this._isUpdated) {
      this.eventBus.emit(Block.EVENTS.FLOW_CDU, oldProps, this.props);
      this._isUpdated = false;
    }
  };

  public compile(template: any, props?: Props): DocumentFragment {
    const propsToUse = typeof props === 'undefined' ? this.props : props;

    const propsAndStubs = { ...propsToUse };

    Object.entries(this.children).forEach(([key, child]) => {
      propsAndStubs[key] = `<div data-id="${child.id}"></div>`;
    });
    /* eslint-disable @typescript-eslint/no-unused-vars */
    Object.entries(this.childItems).forEach(([key, _]) => {
      propsAndStubs[key] = `<div data-id="${key}"></div>`;
    });

    const fragment = document.createElement('template');
    fragment.innerHTML = Handlebars.compile(template)(propsAndStubs);

    Object.values(this.children).forEach((child) => {
      const stub = fragment.content.querySelector(`[data-id="${child.id}"]`);

      if (stub) {
        const content = child.getContent();

        if (content) {
          stub.replaceWith(content);
        }
      }
    });

    Object.entries(this.childItems).forEach(([key, items]) => {
      const stub = fragment.content.querySelector(`[data-id="${key}"]`);

      if (!stub) {
        return;
      }

      const itemsContent = document.createElement('template');

      items.forEach((item) => {
        if (item instanceof Block) {
          const content = item.getContent();

          if (content) {
            itemsContent.content.append(content);
          }
        } else {
          itemsContent.content.append(item);
        }
      });

      stub.replaceWith(itemsContent.content);
    });

    return fragment.content;
  }

  public show(): void {
    const element = this.getContent() as HTMLElement;

    if (element !== null) {
      element.style.display = 'block';
    }
  }

  public hide(): void {
    const element = this.getContent() as HTMLElement;

    if (element !== null) {
      element.style.display = 'none';
    }
  }
}
