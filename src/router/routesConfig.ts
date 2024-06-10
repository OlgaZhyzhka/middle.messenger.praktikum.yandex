import { ROUTES } from '@/utils/enums';
import { authMiddleware } from '@/helpers/authMiddleware';
import { Messenger, Login, Registration, Settings, Error404, Error500 } from '@/views/pages';

export const routesConfig = [
  {
    path: ROUTES.Home,
    component: Messenger,
    title: 'Chateo - simple messenger',
    props: {
      pageTitle: 'Welcome to Simple Chat!',
    },
    middleware: authMiddleware,
  },
  {
    path: ROUTES.Login,
    component: Login,
    title: 'Chateo - simple messenger - welcome',
    props: {
      pageTitle: 'Welcome to Simple Chat!',
      imgSrc: '/images/logotype.svg',
      imgAlt: 'simple chat logo',
    },
    middleware: authMiddleware,
  },
  {
    path: ROUTES.Registration,
    component: Registration,
    title: 'Chateo - simple messenger - Create account',
    props: {
      pageTitle: 'Connect easily with your family and friends over countries',
    },
    middleware: authMiddleware,
  },
  {
    path: ROUTES.Messenger,
    component: Messenger,
    title: 'Chateo - simple messenger chat room',
    middleware: authMiddleware,
  },
  {
    path: ROUTES.Settings,
    component: Settings,
    title: 'Chateo - simple messenger user settings',
    middleware: authMiddleware,
  },
  {
    path: ROUTES.Error404,
    component: Error404,
    title: 'Chateo - simple messenger',
    props: {
      pageTitle: 'Page not found',
      imgSrc: '/images/logotype.svg',
      imgAlt: 'simple chat logo',
    },
  },
  {
    path: ROUTES.Error500,
    component: Error500,
    title: 'Chateo - simple messenger',
    props: {
      pageTitle: 'Server error',
      imgSrc: '/images/logotype.svg',
      imgAlt: 'simple chat logo',
    },
  },
  {
    path: '*',
    component: Error404,
    title: 'Chateo - simple messenger',
    props: {
      pageTitle: 'Page not found',
      imgSrc: '/images/logotype.svg',
      imgAlt: 'simple chat logo',
    },
  },
];

export default routesConfig;
