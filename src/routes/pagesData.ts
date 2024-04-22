import { Routes } from './Routes';

export type PageData = {
  title: string;
};

export const pagesData: Record<Routes, PageData> = {
  [Routes.Home]: { title: 'Chateo - simple messenger - list of pages' },
  [Routes.Login]: { title: 'Chateo - simple messenger - welcome' },
  [Routes.Error404]: { title: 'Chateo - simple messenger' },
  [Routes.Error500]: { title: 'Chateo - simple messenger' },
  [Routes.Registration]: {
    title: ''
  },
  [Routes.Messenger]: {
    title: ''
  },
  [Routes.Settings]: {
    title: ''
  },
  [Routes.SettingsEdit]: {
    title: ''
  },
  [Routes.SettingsPassword]: {
    title: ''
  }
};
