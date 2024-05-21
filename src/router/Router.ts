import Block from '@/core/Block.ts';
import { RouteOptionsWithProps } from '@/utils/interfaces.ts';
import { ROUTES } from '@/utils/enums.ts';
import { MiddleWare } from '@/utils/types.ts';

import Route from './Route.ts';

class Router {
  private static __instance: Router;

  private routes: Route[] = [];

  private history: History = window.history;

  private _currentRoute: Route | null = null;

  private _rootQuery?: string;

  constructor(rootQuery: string = '') {
    this._rootQuery = rootQuery;
    this.listen();
  }

  public static getInstance(rootQuery?: string): Router {
    if (!Router.__instance) {
      Router.__instance = new Router(rootQuery);
    } else if (rootQuery) {
      Router.__instance._rootQuery = rootQuery;
    }

    return Router.__instance;
  }

  public use(
    pathname: string,
    blockConstructor: typeof Block,
    props?: RouteOptionsWithProps,
    middleware?: MiddleWare | undefined
  ): Router {
    const route = new Route(pathname, blockConstructor, { ...props, rootQuery: this._rootQuery }, middleware);
    this.routes.push(route);
    return this;
  }

  public start(): void {
    this._onRoute(window.location.pathname);
  }

  private listen(): void {
    window.onpopstate = (): void => {
      this._onRoute(window.location.pathname);
    };
  }

  private _onRoute(pathname: string): void {
    const route = this.getRoute(pathname);

    if (!route) {
      this.go(ROUTES.Error404);
      return;
    }

    if (this._currentRoute && this._currentRoute !== route) {
      this._currentRoute.leave();
    }

    this._currentRoute = route;

    if (route.middleware) {
      const redirectOccurred = route.middleware(pathname);
      if (redirectOccurred) {
        return;
      }
    }

    // route.middleware?.(pathname);
    route.render();
  }

  public go(pathname: string): void {
    this.history.pushState({}, '', pathname);
    this._onRoute(pathname);
  }

  private getRoute(pathname: string): Route | undefined {
    return this.routes.find((route) => route.match(pathname));
  }

  public back(): void {
    this.history.back();
  }

  public forward(): void {
    this.history.forward();
  }
}

export default Router;
