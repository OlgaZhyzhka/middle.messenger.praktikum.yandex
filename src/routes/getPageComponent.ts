import Block from '@/core/Block';
import { Link } from '@/views/components/Link';
import { Home } from '@/views/pages/Home';
import { Login } from '@/views/pages/Login';
import { Registration } from '@/views/pages/Registration';
import { Error404 } from '@/views/pages/Error404';
import { Routes } from './Routes';
import { handleLinkClick } from './handleLinkClick';

export const getPageComponent = (path: string): Block | undefined => {
  switch (path) {
    case Routes.Home:
      return new Home({
        pageTitle: 'Chateo - simple messenger',
        links: [
          new Link({
            attributes: { class: 'link', href: Routes.Login },
            text: 'Login page',
            events: { click: (event) => handleLinkClick(event, Routes.Login) },
          }),
          new Link({
            attributes: { class: 'link', href: Routes.Register },
            text: 'Registration page',
            events: { click: (event) => handleLinkClick(event, Routes.Register) },
          }),
        ],
      });
    case Routes.Login:
      return new Login({
        pageTitle: 'Welcome to Simple Chat!',
        imgSrc: '/images/logotype.svg',
        imgAlt: 'simple chat logo',
      });
    case Routes.Register:
      return new Registration({
        pageTitle: 'Connect easily with your family and friends over countries',
      });
    case Routes.Error404:
      return new Error404({ pageTitle: '404' });
    default:
      return new Error404({ pageTitle: '404' });
  }
};
