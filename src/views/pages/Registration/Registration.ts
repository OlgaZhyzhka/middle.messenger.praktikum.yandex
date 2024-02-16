import Template from '@/core/Template';
import tpl from '@/views/pages/login/tpl.hbs?raw';

class LoginPage extends Template {
  constructor() {
    super(tpl);
  }
}

export default LoginPage;
