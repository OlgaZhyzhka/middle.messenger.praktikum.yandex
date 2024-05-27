import UserApi from '@/api/UserApi';
import { store } from '@/store';
import { handleError } from '@/helpers/handleError';
import { HTTP_CODES } from '@/utils/enums';
import { UpdateUser, UpdatePassword, User } from '@/utils/interfaces';
import { actions } from '@/store/actions';

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
      const { status, ...userData } = response;

      if (status === HTTP_CODES.OK) {
        this.updateUserProfile(userData as User);
      }
    } catch (error: unknown) {
      console.error(error);
      const errorMessage = handleError(error);
      actions.setUpdateError(errorMessage);
    } finally {
      store.set({ isLoading: false });
    }
  }

  public static async updatePassword(data: UpdatePassword): Promise<void> {
    try {
      store.set({ isLoading: true });
      const response = await userApi.updatePassword(data);
      const { status } = response;

      if (status === HTTP_CODES.OK) {
        actions.setUpdatePassword(true);
        actions.setUpdateError(null);
        setTimeout(() => actions.setUpdatePassword(false), 5000);
      }
    } catch (error: unknown) {
      console.error(error);
      const errorMessage = handleError(error);
      actions.setUpdateError(errorMessage);
    } finally {
      store.set({ isLoading: false });
    }
  }

  public static async updateAvatar(data: FormData): Promise<void> {
    try {
      store.set({ isLoading: true });
      const response = await userApi.updateAvatar(data);
      const { status, ...userData } = response;

      if (status === HTTP_CODES.OK) {
        this.updateUserProfile(userData as User);
      }
    } catch (error: unknown) {
      console.error(error);
      const errorMessage = handleError(error);
      actions.setUpdateError(errorMessage);
    } finally {
      store.set({ isLoading: false });
    }
  }

  public static async findUser(login: string): Promise<User[] | undefined> {
    try {
      store.set({ isLoading: true });
      const res = await userApi.findUser(login);
      const { status, response } = res;

      if (status === HTTP_CODES.OK) {
        return response as User[];
      }
    } catch (error: unknown) {
      console.error(error);
      const errorMessage = handleError(error);
      actions.setUpdateError(errorMessage);
    } finally {
      store.set({ isLoading: false });
    }
    return undefined;
  }
}

export default UserService;