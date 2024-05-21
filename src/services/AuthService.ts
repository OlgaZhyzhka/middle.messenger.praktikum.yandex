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

  public static async login(data: SignInRequest): Promise<void> {
    try {
      store.set({ isLoading: true });
      const response = await authApi.signIn(data);
      const { status, data: responseData } = response;

      if (isAPIError(responseData)) {
        if (responseData.reason !== 'User already in system' && status !== 200) {
          throw new Error(responseData.reason);
        }
      }

      store.set({ isAuthenticated: true });
      this.goToMessenger();
    } catch (error: unknown) {
      console.error(error);
      const errorMessage = handleApiError(error);
      store.set({ loginError: errorMessage });
    } finally {
      store.set({ isLoading: false });
    }
  }

  public static async signUp(data: CreateUserDTO): Promise<void> {
    try {
      store.set({ isLoading: true });
      const response = await authApi.signUp(data);
      const { status, data: responseData } = response;

      if (isAPIError(responseData)) {
        if (responseData.reason !== ERRORS_MESSAGES.USER_IN_SYSTEM && status !== HTTP_CODES.OK) {
          throw new Error(responseData.reason);
        }
      }

      const userResponse = (await authApi.getUser());

      const { data: userResponseData } = userResponse;

      if (!userResponse) {
        throw new Error('Failed to retrieve user data after registration');
      }

      if (isAPIError(userResponseData)) {
        throw new Error(userResponseData.reason);
      }

      store.set({ user: userResponseData as UserDTO, isAuthenticated: true });
      this.goToMessenger();
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
      const { status, data: responseData } = response;

      if (isAPIError(responseData)) {
        throw new Error(responseData.reason);
      }

      if (status === 200) {
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
