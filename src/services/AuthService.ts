import AuthAPI from '@/api/AuthApi';
import router from '@/router/Router';
import { store } from '@/store';
import { actions } from '@/store/actions';
import { ApiError, ApiResponse, CreateUser, SignInRequest, User } from '@/utils/interfaces';
import { isAPIError } from '@/utils/guards';
import { ERRORS_MESSAGES, HTTP_CODES, ROUTES } from '@/utils/enums';
import { handleApiError } from '@/helpers/handleApiError';
import { handleResponseError } from '@/helpers/handleResponseError';

const authApi = new AuthAPI();

class AuthService {
  public static async authUser(): Promise<void> {
    try {
      const response = await authApi.getUser();
      this.checkResponse(response);
      const { status, ...data } = response;
      actions.setUser(data as User);
      actions.setAuthenticated(true);
      actions.setLoginError(null);
      actions.setSignUpError(null);
      sessionStorage.setItem('isAuthenticated', 'true');
    } catch (error: unknown) {
      const errorMessage = handleApiError(error);
      console.error(errorMessage);
      actions.setAuthenticated(false);
      actions.setUser(null);
      sessionStorage.removeItem('isAuthenticated');
      handleResponseError(error as ApiError);
    }
  }

  public static async login(data: SignInRequest): Promise<void> {
    try {
      actions.setLoading(true);
      const response = await authApi.signIn(data);
      this.checkResponse(response);
      await this.redirectToMessenger();
    } catch (error: unknown) {
      const errorMessage = handleApiError(error);
      console.error(errorMessage);
      actions.setLoginError(errorMessage);
      handleResponseError(error as ApiError);
    } finally {
      actions.setLoading(false);
    }
  }

  public static async signUp(data: CreateUser): Promise<void> {
    try {
      actions.setLoading(true);
      const response = await authApi.signUp(data);
      this.checkResponse(response);
      await this.redirectToMessenger();
    } catch (error: unknown) {
      const errorMessage = handleApiError(error);
      console.error(errorMessage);
      actions.setSignUpError(errorMessage);
      handleResponseError(error as ApiError);
    } finally {
      store.set({ isLoading: false });
    }
  }

  private static async redirectToMessenger(): Promise<void> {
    try {
      await this.authUser();
      router.go(ROUTES.Messenger);
    } catch (error) {
      console.error(ERRORS_MESSAGES.AUTH_FAILED, error);
    }
  }

  public static async logout(): Promise<void> {
    try {
      const response = await authApi.logout();
      this.checkResponse(response);
      actions.setUser(null);
      actions.setAuthenticated(false);
      sessionStorage.removeItem('isAuthenticated');
      router.go(ROUTES.Home);
    } catch (error: unknown) {
      const errorMessage = handleApiError(error);
      console.error(errorMessage);
      handleResponseError(error as ApiError);
    }
  }

  private static checkResponse(response: ApiResponse | ApiError): void {
    if (!response) {
      throw new Error(ERRORS_MESSAGES.RESPONSE_ERROR);
    }

    const { status } = response;

    if (isAPIError(response)) {
      if (response.reason === ERRORS_MESSAGES.USER_IN_SYSTEM && status !== HTTP_CODES.OK) {
        return
      }

      throw new Error(response.reason);
    }

    if (status !== HTTP_CODES.OK) {
      throw new Error(`requestErr: ${JSON.stringify(response)}`);
    }
  }
}

export default AuthService;
