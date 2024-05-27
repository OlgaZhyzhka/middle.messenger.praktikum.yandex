import { store } from '@/store';
import router from '@/router/Router';
import { ROUTES } from '@/utils/enums';

export const authMiddleware = (pathname: string): boolean => {
  const { isAuthenticated } = store.getState();
  const requiresAuth = [ROUTES.Home, ROUTES.Messenger, ROUTES.Settings].includes(pathname as ROUTES);
  const isAuthPage = [ROUTES.Login, ROUTES.Registration].includes(pathname as ROUTES);

  if (isAuthenticated && isAuthPage) {
    router.go(ROUTES.Messenger);
    return true;
  }
  if (!isAuthenticated && requiresAuth) {
    router.go(ROUTES.Login);
    return true;
  }

  return false;
};
