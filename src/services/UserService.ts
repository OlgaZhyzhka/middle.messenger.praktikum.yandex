import UserApi from '@/api/UserApi';
import { store } from '@/store';
import { actions } from '@/store/actions';
import { handleApiError } from '@/helpers/handleApiError';
import { handleResponseError } from '@/helpers/handleResponseError';
import { ERRORS_MESSAGES, HTTP_CODES } from '@/utils/enums';
import { UpdateUser, UpdatePassword, User, ApiResponse, ApiError } from '@/utils/interfaces';
import { isAPIError } from '@/utils/guards';

const userApi = new UserApi();

class UserService {
  private static updateUserProfile(user: User): void {
    actions.setUser(user);
    actions.setUpdateError(null);
  }

  public static async updateProfile(data: UpdateUser): Promise<void> {
    try {
      store.set({ isLoading: true });
      const response = await userApi.updateProfile(data);
      this.checkResponse(response);
      const { status, ...userData } = response;
      this.updateUserProfile(userData as User);
    } catch (error: unknown) {
      const errorMessage = handleApiError(error);
      console.error(error);
      actions.setUpdateError(errorMessage);
      handleResponseError(error as ApiError);
    } finally {
      store.set({ isLoading: false });
    }
  }

  public static async updatePassword(data: UpdatePassword): Promise<void> {
    try {
      store.set({ isLoading: true });
      const response = await userApi.updatePassword(data);
      this.checkResponse(response);
      actions.setUpdatePassword(true);
      actions.setUpdateError(null);
      setTimeout(() => actions.setUpdatePassword(false), 5000);
    } catch (error: unknown) {
      const errorMessage = handleApiError(error);
      actions.setUpdateError(errorMessage);
      console.error(errorMessage);
      handleResponseError(error as ApiError);
    } finally {
      store.set({ isLoading: false });
    }
  }

  public static async updateAvatar(data: FormData): Promise<void> {
    try {
      store.set({ isLoading: true });
      const response = await userApi.updateAvatar(data);
      this.checkResponse(response);
      const { status, ...userData } = response;
      this.updateUserProfile(userData as User);
    } catch (error: unknown) {
      const errorMessage = handleApiError(error);
      console.error(errorMessage);
      actions.setUpdateError(errorMessage);
      handleResponseError(error as ApiError);
    } finally {
      store.set({ isLoading: false });
    }
  }

  public static async findUser(login: string): Promise<User[] | undefined> {
    try {
      store.set({ isLoading: true });
      const response = await userApi.findUser(login);
      this.checkResponse(response);
      const { data } = response;
      return data as User[];
    } catch (error: unknown) {
      const errorMessage = handleApiError(error);
      console.error(errorMessage);
      actions.setUpdateError(errorMessage);
      handleResponseError(error as ApiError);
    } finally {
      store.set({ isLoading: false });
    }
    return undefined;
  }

  private static checkResponse(response: ApiResponse | ApiError): void {
    if (!response) {
      throw new Error(ERRORS_MESSAGES.RESPONSE_ERROR);
    }

    const { status } = response;

    if (isAPIError(response)) {
      throw new Error(response.reason);
    }

    if (status !== HTTP_CODES.OK) {
      throw new Error(ERRORS_MESSAGES.USER_UPDATE_ERROR);
    }
  }
}

export default UserService;
