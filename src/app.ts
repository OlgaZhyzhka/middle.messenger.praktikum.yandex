import '@/scss/app.scss';
import { store } from '@/store';
import Router from '@/router/Router';
import { ROUTES } from '@/utils/enums';
import { Link } from '@/views/components/Link';
import { Login } from '@/views/pages/Login';
import { Registration } from '@/views/pages/Registration';
import { Error404 } from '@/views/pages/Error404';
import { Error500 } from '@/views/pages/Error500';
import { Messenger } from '@/views/pages/Messenger';
import { Settings } from '@/views/pages/Settings';

store.set({
  isLoading: false,
  loginError: null,
  loginFields: {},
  user: null,
  selectedChat: null,
});

const {user} = store.getState();

const rootQuery = '#app';
const router = Router.getInstance(rootQuery);

if (user) {
  router.use(ROUTES.Home, Messenger, { title: 'Chateo - simple messenger', props: {} });
} else {
  router.use(ROUTES.Home, Login, {
    title: 'Chateo - simple messenger - welcome',
    props: {
      pageTitle: 'Welcome to Simple Chat!',
      imgSrc: '/images/logotype.svg',
      imgAlt: 'simple chat logo',
    },
  });
}
router.use(ROUTES.Login, Login, {
  title: 'Chateo - simple messenger - welcome',
  props: {
    pageTitle: 'Welcome to Simple Chat!',
    imgSrc: '/images/logotype.svg',
    imgAlt: 'simple chat logo',
  },
});

router.use(ROUTES.Registration, Registration, {
  title: 'Chateo - simple messenger - sign up',
  props: {
    pageTitle: 'Connect easily with your family and friends over countries',
  },
});

router.use(ROUTES.Error404, Error404, {
  title: 'Chateo - simple messenger',
  props: {
    pageTitle: '404',
    imgSrc: '/images/logotype-mini.svg',
    imgAlt: 'simple chat logo',
    link: new Link({
      attributes: { class: 'button button_primary button_md button_rounded page__button', href: ROUTES.Home },
      text: 'Go to home page',
    }),
  },
});

router.use(ROUTES.Error500, Error500, {
  title: 'Chateo - simple messenger',
  props: {
    pageTitle: '500',
    imgSrc: '/images/logotype-mini.svg',
    imgAlt: 'simple chat logo',
    link: new Link({
      attributes: { class: 'button button_primary button_md button_rounded page__button', href: ROUTES.Home },
      text: 'Go to home page',
    }),
  },
});

router.use(ROUTES.Messenger, Messenger, {
  title: 'Chateo - simple messenger',
  props: {},
});

router.use(ROUTES.Settings, Settings, {
  title: 'Chateo - simple messenger settings',
  props: {},
});

router.start();