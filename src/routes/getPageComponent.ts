import Block from '@/core/Block';
import { Link } from '@/views/components/Link';
import { Home } from '@/views/pages/Home';
import { Login } from '@/views/pages/Login';
import { Registration } from '@/views/pages/Registration';
import { Messenger } from '@/views/pages/Messenger';
import { Settings } from '@/views/pages/Settings';
import { Error404 } from '@/views/pages/Error404';
import { Error500 } from '@/views/pages/Error500';
import { handleLinkClick } from './handleLinkClick';
import { Routes } from './Routes';

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
            attributes: { class: 'link', href: Routes.Registration },
            text: 'Registration page',
            events: { click: (event) => handleLinkClick(event, Routes.Registration) },
          }),
          new Link({
            attributes: { class: 'link', href: Routes.Messenger },
            text: 'Messenger page',
            events: { click: (event) => handleLinkClick(event, Routes.Messenger) },
          }),
          new Link({
            attributes: { class: 'link', href: Routes.Settings },
            text: 'Settings page',
            events: { click: (event) => handleLinkClick(event, Routes.Settings) },
          }),
          new Link({
            attributes: { class: 'link', href: Routes.Error404 },
            text: '404 page',
            events: { click: (event) => handleLinkClick(event, Routes.Error404) },
          }),
          new Link({
            attributes: { class: 'link', href: Routes.Error404 },
            text: '500 page',
            events: { click: (event) => handleLinkClick(event, Routes.Error500) },
          }),
        ],
      });
    case Routes.Login:
      return new Login({
        pageTitle: 'Welcome to Simple Chat!',
        imgSrc: '/images/logotype.svg',
        imgAlt: 'simple chat logo',
      });
    case Routes.Registration:
      return new Registration({
        pageTitle: 'Connect easily with your family and friends over countries',
      });
    case Routes.Messenger:
      return new Messenger({});
    case Routes.Settings:
      return new Settings({});
    case Routes.Error404:
      return new Error404({
        pageTitle: '404',
        imgSrc: '/images/logotype-mini.svg',
        imgAlt: 'simple chat logo',
        link: new Link({
          attributes: { class: 'button button_primary button_md button_rounded page__button', href: Routes.Home },
          text: 'Go to home page',
          events: { click: (event) => handleLinkClick(event, Routes.Home) },
        }),
      });
    case Routes.Error500:
      return new Error500({
        pageTitle: '500',
        imgSrc: '/images/logotype-mini.svg',
        imgAlt: 'simple chat logo',
        link: new Link({
          attributes: { class: 'button button_primary button_md button_rounded page__button', href: Routes.Home },
          text: 'Go to home page',
          events: { click: (event) => handleLinkClick(event, Routes.Home) },
        }),
      });
    default:
      return new Error404({ pageTitle: '404' });
  }
};
