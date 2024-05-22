import '@/scss/app.scss';
import Router from '@/router/Router';
import routesConfig from '@/router/routesConfig';
import { store } from '@/store';

const rootQuery = '#app';
const router = Router.getInstance(rootQuery);

window.router = router;
window.store = store;

routesConfig.forEach((route) => {
  router.use(
    route.path,
    route.component,
    {
      title: route.title,
      props: route.props,
    },
    route.middleware
  );
});

router.start();
