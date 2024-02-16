import handleRouteChange from './handleRouteChange';

const navigateTo = (url: string): void => {
  history.pushState({}, '', url);
  handleRouteChange();
};

export default navigateTo;
