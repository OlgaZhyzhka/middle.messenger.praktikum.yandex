import Router from '@/router/Router';
import { Store } from '@/store/Store';

declare module '*?raw' {
  const content: string;
  export default content;
}

declare global {
  interface Window {
    router: Router;
    store: Store;
  }
}
