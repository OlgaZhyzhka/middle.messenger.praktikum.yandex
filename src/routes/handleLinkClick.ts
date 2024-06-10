import navigateTo from './navigateTo';

export const handleLinkClick = (event: Event, href: string): void => {
  event.preventDefault();
  navigateTo(href);
};
