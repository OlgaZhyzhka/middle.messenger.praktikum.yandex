import '@/scss/app.scss';
import router from '@/router/Router';
import routesConfig from '@/router/routesConfig';
import { store } from '@/store';

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
