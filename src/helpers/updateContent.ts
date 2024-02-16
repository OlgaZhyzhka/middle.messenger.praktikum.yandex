const updateContent = (html: string): void => {
  const appElement = document.querySelector('#app')!;

  appElement.textContent = '';
  appElement.innerHTML = html;
};

export default updateContent;
