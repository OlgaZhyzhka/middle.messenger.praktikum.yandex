import '@/scss/app.scss';
import AuthService from '@/services/AuthService';
import { ERRORS_MESSAGES } from '@/utils/enums';
import { router } from '@/router/Router';
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

const isAuth = sessionStorage.getItem('isAuthenticated') === 'true';

if (isAuth) {
  try {
    await AuthService.authUser();
  } catch (error) {
    console.error(ERRORS_MESSAGES.AUTH_FAILED, error);
  }
}

router.start();