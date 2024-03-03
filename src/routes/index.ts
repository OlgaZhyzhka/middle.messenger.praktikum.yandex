import handleRouteChange from './handleRouteChange';

window.addEventListener('popstate', handleRouteChange);
document.addEventListener('DOMContentLoaded', () => handleRouteChange());
