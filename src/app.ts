import '@/scss/app.scss';
import Router from '@/router/Router';
import { Routes } from '@/router/enums';
import { Home } from '@/views/pages/Home';
import { Link } from '@/views/components/Link';
import { Login } from '@/views/pages/Login';
import { Registration } from '@/views/pages/Registration';
import { Error404 } from '@/views/pages/Error404';
import { Error500 } from '@/views/pages/Error500';
import { Messenger } from '@/views/pages/Messenger';
import { Settings } from '@/views/pages/Settings';


const rootQuery = '#app';
const router = Router.getInstance(rootQuery);

router.use('/', Home, {
  title: 'Chateo - simple messenger',
  props: {
    pageTitle: 'Chateo - simple messenger',
    links: [
      new Link({
        attributes: { class: 'link', href: Routes.Login },
        text: 'Login page',
      }),
      new Link({
        attributes: { class: 'link', href: Routes.Registration },
        text: 'Registration page',
      }),
      new Link({
        attributes: { class: 'link', href: Routes.Messenger },
        text: 'Messenger page',
      }),
      new Link({
        attributes: { class: 'link', href: Routes.Settings },
        text: 'Settings page',
      }),
      new Link({
        attributes: { class: 'link', href: Routes.Error404 },
        text: '404 page',
      }),
      new Link({
        attributes: { class: 'link', href: Routes.Error404 },
        text: '500 page',
      }),
    ],
  },
});

router.use(Routes.Login, Login, {
  title: 'Chateo - simple messenger - welcome',
  props: {
    pageTitle: 'Welcome to Simple Chat!',
    imgSrc: '/images/logotype.svg',
    imgAlt: 'simple chat logo',
  },
});

router.use(Routes.Registration, Registration, {
  title: 'Chateo - simple messenger - sign up',
  props: {
    pageTitle: 'Connect easily with your family and friends over countries',
  },
});

router.use(Routes.Error404, Error404, {
  title: 'Chateo - simple messenger',
  props: {
    pageTitle: '404',
    imgSrc: '/images/logotype-mini.svg',
    imgAlt: 'simple chat logo',
    link: new Link({
      attributes: { class: 'button button_primary button_md button_rounded page__button', href: Routes.Home },
      text: 'Go to home page',
    }),
  },
});

router.use(Routes.Error500, Error500, {
  title: 'Chateo - simple messenger',
  props: {
    pageTitle: '500',
    imgSrc: '/images/logotype-mini.svg',
    imgAlt: 'simple chat logo',
    link: new Link({
      attributes: { class: 'button button_primary button_md button_rounded page__button', href: Routes.Home },
      text: 'Go to home page',
    }),
  },
});

router.use(Routes.Messenger, Messenger, {
  title: 'Chateo - simple messenger',
  props: {},
});

router.use(Routes.Settings, Settings, {
  title: 'Chateo - simple messenger settings',
  props: {},
});

router.start();