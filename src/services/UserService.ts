import UserAPI from '@/api/UserApi';
import { store } from '@/store';
import { handleApiError } from '@/helpers/handleApiError';
import { HTTP_CODES } from '@/utils/enums';
import { UpdateUserDTO, UpdatePasswordDTO, UserDTO } from '@/utils/interfaces';

const userApi = new UserAPI();

export default class UserService {
  private static updateUserProfile(user: UserDTO): void {
    store.set({ user });
    this.resetErrors();
  }

  private static resetErrors(): void {
    store.set({ profileUpdateError: null });
  }

  public static async updateProfile(data: UpdateUserDTO): Promise<void> {
    try {
      store.set({ isLoading: true });
      const response = await userApi.updateProfile(data);
      const { status, ...userData } = response;

      if (status === HTTP_CODES.OK) {
        this.updateUserProfile(userData as UserDTO);
      }
    } catch (error: unknown) {
      console.error(error);
      const errorMessage = handleApiError(error);
      store.set({ profileUpdateError: errorMessage });
    } finally {
      store.set({ isLoading: false });
    }
  }

  public static async updatePassword(data: UpdatePasswordDTO): Promise<void> {
    try {
      store.set({ isLoading: true });
      const response = await userApi.updatePassword(data);
      const { status } = response;

      if (status === HTTP_CODES.OK) {
        store.set({ isUpdatePassword: true });
        this.resetErrors();
        setTimeout(() => store.set({ isUpdatePassword: false }), 5000);
      }
    } catch (error: unknown) {
      console.error(error);
      const errorMessage = handleApiError(error);
      store.set({ profileUpdateError: errorMessage });
    } finally {
      store.set({ isLoading: false });
    }
  }

  public static async updateAvatar(file: File): Promise<void> {
    try {
      store.set({ isLoading: true });
      const response = await userApi.updateAvatar(file);
      const { status, ...userData } = response;

      if (status === HTTP_CODES.OK) {
        this.updateUserProfile(userData as UserDTO);
      }
    } catch (error: unknown) {
      console.error(error);
      const errorMessage = handleApiError(error);
      store.set({ profileUpdateError: errorMessage });
    } finally {
      store.set({ isLoading: false });
    }
  }
}
