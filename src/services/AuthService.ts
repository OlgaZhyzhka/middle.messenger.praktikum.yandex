import AuthAPI from '@/api/AuthApi';
import Router from '@/router/Router';
import { store } from '@/store';
import { CreateUserDTO, SignInRequest, UserDTO } from '@/utils/interfaces';
import { isAPIError } from '@/utils/guards';
import { ERRORS_MESSAGES, HTTP_CODES, ROUTES } from '@/utils/enums';
import { handleApiError } from '@/helpers/handleApiError';

const authApi = new AuthAPI();
const router = Router.getInstance();

export default class AuthService {
  private static goToMessenger(): void {
    router.go(ROUTES.Messenger);
  }

  private static async authUser(): Promise<void> {
    const response = await authApi.getUser();
    const { status, ...userData } = response;

    if (!response) {
      throw new Error('Failed to retrieve user data after registration');
    }

    if (isAPIError(response)) {
      throw new Error(response.reason);
    }

    if (status === HTTP_CODES.OK) {
      store.set({ user: userData as UserDTO, isAuthenticated: true, loginError: null, signUpError: null});
      this.goToMessenger();
    }
  }

  public static async login(data: SignInRequest): Promise<void> {
    try {
      store.set({ isLoading: true });
      const response = await authApi.signIn(data);
      const { status } = response;

      if (isAPIError(response)) {
        if (response.reason !== 'User already in system' && status !== 200) {
          throw new Error(response.reason);
        }
      }

      this.authUser();
    } catch (error: unknown) {
      console.error(error);
      const errorMessage = handleApiError(error);
      store.set({ loginError: errorMessage });
    } finally {
      store.set({ isLoading: false});
    }
  }

  public static async signUp(data: CreateUserDTO): Promise<void> {
    try {
      store.set({ isLoading: true });
      const response = await authApi.signUp(data);
      const { status } = response;

      if (isAPIError(response)) {
        if (response.reason !== ERRORS_MESSAGES.USER_IN_SYSTEM && status !== HTTP_CODES.OK) {
          throw new Error(response.reason);
        }
      }

      this.authUser();
    } catch (error: unknown) {
      console.error(error);
      const errorMessage = handleApiError(error);
      store.set({ signUpError: errorMessage });
    } finally {
      store.set({ isLoading: false });
    }
  }

  public static async logout(): Promise<void> {
    try {
      const response = await authApi.logout();
      const { status } = response;

      if (isAPIError(response)) {
        throw new Error(response.reason);
      }

      if (status === HTTP_CODES.OK) {
        store.set({ user: null, isAuthenticated: false });
        router.go(ROUTES.Home);
      } else {
        throw new Error('Failed to logout');
      }
    } catch (error) {
      console.error(error);
    }
  }
}
