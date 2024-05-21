import '@/scss/app.scss';
import Router from '@/router/Router';
import routesConfig from '@/router/routesConfig';

const rootQuery = '#app';
const router = Router.getInstance(rootQuery);

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
