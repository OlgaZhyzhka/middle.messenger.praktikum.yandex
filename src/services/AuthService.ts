import AuthAPI from '@/api/AuthApi';
// import Router from '@/router/Router';
import { store } from '@/store';
import { CreateUserDTO, SignInRequest } from '@/utils/interfaces';

const authApi = new AuthAPI();
// const router = Router.getInstance();

export default class AuthService {
  public static async login(data: SignInRequest): Promise<void> {
    try {
      // const validateData = userLoginValidator(data);

      // if (!validateData.isCorrect) {
      //   throw validateData;
      // }
      store.set({ isLoading: true });
      const res = await authApi.signIn(data);
      console.log(res);

      // if (res.status !== 200) {
      //   throw { type: 'requestErr', desc: res };
      // }

      // bus.emit('getUser');
      // bus.emit('getChats');

      // router.go('/messenger');
    } catch (error) {
      console.error(error);
      store.set({ loginError: error });
    } finally {
      store.set({ isLoading: false });
    }
  }

  public static async signUp(data: CreateUserDTO): Promise<void> {
    try {
      // const validateData = userSignUpValidator(data);

      // if (!validateData.isCorrect) {
      //   throw validateData;
      // }
      store.set({ isLoading: true });
      const res = await authApi.signUp(data);
      console.log(res);
      // if (res.status !== 200) {
      //   throw { type: 'requestErr', desc: res };
      // }

      // bus.emit('getUser');
      // bus.emit('getChats');

      // router.go('/messenger');
    } catch (error) {
      console.error(error);
      store.set({ signUpError: error });
    } finally {
      store.set({ isLoading: false });
    }
  }

  public static async logout(): Promise<void> {
    try {
      // const res = await authApi.logout();

      // if (res) {
      //   throw { type: 'requestErr', desc: res };
      // }

      // bus.emit('getUser');

      // router.go('/');

      // bus.emit('getUser');
      // bus.emit('getChats');
    } catch (error) {
      console.error(error);
    }
  }
}
