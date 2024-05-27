import AuthAPI from '@/api/AuthApi';
import router from '@/router/Router';
import { store } from '@/store';
import { actions } from '@/store/actions';
import { CreateUser, SignInRequest, User } from '@/utils/interfaces';
import { isAPIError } from '@/utils/guards';
import { ERRORS_MESSAGES, HTTP_CODES, ROUTES } from '@/utils/enums';
import { handleError } from '@/helpers/handleError';

const authApi = new AuthAPI();

class AuthService {
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
      actions.setUser(userData as User);
      actions.setAuthenticated(true);
      this.goToMessenger();
    }
  }

  public static async login(data: SignInRequest): Promise<void> {
    try {
      actions.setLoading(true);
      const response = await authApi.signIn(data);
      const { status } = response;

      if (isAPIError(response)) {
        if (response.reason !== ERRORS_MESSAGES.USER_IN_SYSTEM && status !== HTTP_CODES.OK) {
          throw new Error(response.reason);
        }
      }

      this.authUser();
    } catch (error: unknown) {
      console.error(error);
      const errorMessage = handleError(error);
      actions.setAuthError(errorMessage);
    } finally {
      actions.setLoading(false);
    }
  }

  public static async signUp(data: CreateUser): Promise<void> {
    try {
      actions.setLoading(true);
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
      const errorMessage = handleError(error);
      actions.setAuthError(errorMessage);
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
        actions.setUser(null);
        actions.setAuthenticated(false);
        router.go(ROUTES.Home);
      } else {
        throw new Error(ERRORS_MESSAGES.LOGOUT_FAILED);
      }
    } catch (error: unknown) {
      console.error(error);
      const errorMessage = handleError(error);
      actions.setAuthError(errorMessage);
    }
  }
}

export default AuthService;