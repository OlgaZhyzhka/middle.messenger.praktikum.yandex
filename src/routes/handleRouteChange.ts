import updateContent from '@/helpers/updateContent';
import { Login } from '@/views/pages/Login';
import { Home } from '@/views/pages/Home';
import { pagesData } from './pagesData';
import { Routes } from './Routes';

const renderHomePage = (): string => {
  const homePage = new Home();
  return homePage.render();
};

const renderLoginPage = (): string => {
  const loginPage = new Login();
  return loginPage.render();
};

const handleRouteChange = (): void => {
  const path = window.location.pathname;
  const pageData = pagesData[path as Routes] || pagesData[Routes.Error404];
  document.title = pageData.title;
  let pageContent = '';

  switch (path) {
    case Routes.Home:
      pageContent = renderHomePage();
      break;
    case Routes.Login:
      pageContent = renderLoginPage();
      break;
    default:
      pageContent = '404 Not Found';
      break;
  }

  updateContent(pageContent);
};

export default handleRouteChange;
