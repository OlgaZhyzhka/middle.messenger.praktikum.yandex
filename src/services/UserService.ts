import UserAPI from '@/api/UserApi';
import { store } from '@/store';
import { handleApiError } from '@/helpers/handleApiError';
// import { isAPIError } from '@/utils/guards';
// import { ERRORS_MESSAGES, HTTP_CODES, ROUTES } from '@/utils/enums';
import { UpdateUserDTO, UserDTO } from '@/utils/interfaces';

const userApi = new UserAPI();

export default class UserService {
  private static updateUserProfile(user: UserDTO): void {
    store.set({ user, profileUpdateError: null});
  }

  public static async updateProfile(data: UpdateUserDTO): Promise<void> {
    try {
      store.set({ isLoading: true });
      const response = await userApi.updateProfile(data);
      const { status, ...userData } = response;

      if (status === 200) {
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
