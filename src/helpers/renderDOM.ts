import Block from '@/core/Block';

const renderDOM = (component: Block, selector: string = '#app'): void => {
  const root = document.querySelector(selector);

  if (root) {
    root.innerHTML = '';
    const content = component.getContent();

    if (!content) return;

    root.appendChild(content);
    component.dispatchComponentDidMount();
  } else {
    console.error('Root element not found');
  }
};

export default renderDOM;
