import Template from '@/core/Template';
import tpl from './tpl.hbs?raw';

class Home extends Template {
  constructor() {
    super(tpl);
  }

  public render(): string {
    const data = {
      pageTitle: 'Chateo - simple messenger',
    };
    return super.render(data);
  }
}

export default Home;
