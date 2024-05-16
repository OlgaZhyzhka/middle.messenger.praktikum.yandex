import Block from '@/core/Block.ts';
import { RouteOptionsWithProps } from '@/utils/interfaces.ts';
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

    // if (!Router.__instance._rootQuery) {
    //   throw new Error('RootQuery must be provided for Router initialization');
    // }

    return Router.__instance;
  }

  public use(pathname: string, blockConstructor: typeof Block, props?: RouteOptionsWithProps): Router {
    const route = new Route(pathname, blockConstructor, { ...props, rootQuery: this._rootQuery });
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
      // 404
      return;
    }

    if (this._currentRoute) {
      this._currentRoute.leave();
    }

    this._currentRoute = route;
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
