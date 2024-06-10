import { expect } from 'chai';

import { store } from '@/store';
import Login from './Login';

describe('Login', () => {
  it('should render the spinner when isLoading is true', () => {
    const login = new Login({});
    store.set({ isLoading: true });
    const element = login.getContent();
    const spinner = element?.querySelector('.spinner');
    /* eslint-disable @typescript-eslint/no-unused-expressions */
    expect(spinner).to.exist;
  });
});
