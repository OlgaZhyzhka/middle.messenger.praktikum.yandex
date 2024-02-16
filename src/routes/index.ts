import handleRouteChange from "./handleRouteChange";
import navigateTo from "./navigateTo";

window.addEventListener('popstate', handleRouteChange);
document.addEventListener('DOMContentLoaded', () => handleRouteChange());

document.addEventListener('click', (event) => {
  const target = event.target as HTMLElement;
  if (target.getAttribute('data-link') !== null) {
    event.preventDefault();
    const href = target.getAttribute('href');
    if (href) navigateTo(href);
  }
});
