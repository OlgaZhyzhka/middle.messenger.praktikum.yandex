import { renderDOM } from '@/helpers';
import { pagesData } from './pagesData';
import { Routes } from './Routes';
import { getPageComponent } from './getPageComponent';
import eventBus from './eventBus';

const handleRouteChange = (): void => {
  const path = window.location.pathname;
  const pageData = pagesData[path as Routes] || pagesData[Routes.Error404];
  document.title = pageData.title;
  const pageComponent = getPageComponent(path);

  if (pageComponent) {
    renderDOM(pageComponent);
  }
};

eventBus.on('routeChange', handleRouteChange);

export default handleRouteChange;
