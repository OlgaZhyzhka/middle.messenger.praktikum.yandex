import { Routes } from './Routes';

export type PageData = {
  title: string;
};

export const pagesData: Record<Routes, PageData> = {
  [Routes.Home]: { title: 'Chateo - simple messenger - list of pages' },
  [Routes.Login]: { title: 'Chateo - simple messenger - welcome' },
  [Routes.Register]: { title: 'Chateo - simple messenger - create account' },
  [Routes.Chats]: { title: 'Chateo - simple messenger - start chatting' },
  [Routes.Profile]: { title: 'Chateo - simple messenger - profile' },
  [Routes.ProfileEdit]: { title: 'Chateo - simple messenger - edit profile' },
  [Routes.ProfilePassword]: { title: 'Chateo - simple messenger - change password' },
  [Routes.Error404]: { title: 'Chateo - simple messenger' },
  [Routes.Error500]: { title: 'Chateo - simple messenger' },
};
