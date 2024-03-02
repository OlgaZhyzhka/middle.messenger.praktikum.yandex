import eventBus from './eventBus';

const navigateTo = (url: string): void => {
  history.pushState({}, '', url);
  eventBus.emit('routeChange');
};

export default navigateTo;
