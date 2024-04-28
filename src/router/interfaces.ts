export interface RouteOptions {
  rootQuery?: string;
  title?: string;
}

export interface RouteOptionsWithProps extends RouteOptions {
  props?: Record<string, unknown>; 
}