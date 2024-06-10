import router from '@/router/Router';
import { actions } from '@/store/actions';
import { HTTP_CODES, ROUTES } from '@/utils/enums';
import { ApiError } from '@/utils/interfaces';

export const handleError = (error: unknown): string => {
  let errorMessage = 'An unknown error occurred';

  if (typeof error === 'string') {
    try {
      const errorObj = JSON.parse(error);
      if ('reason' in errorObj) {
        errorMessage = errorObj.reason;
      }
    } catch (parseError) {
      console.error('Error parsing error message:', parseError);
    }
  } else if (error instanceof Error) {
    errorMessage = error.message;
  } else if (error && typeof error === 'object' && 'reason' in error) {
    const apiError = error as ApiError;
    errorMessage = apiError.reason || errorMessage;
  }

  if ((error as { type: string; desc: { status: number } }).type === 'requestErr') {
    const customErr = error as { type: string; desc: { status: number } };

    if (customErr.desc.status === HTTP_CODES.UNAUTHORIZED) {
      actions.setUser(null);
      router.go(ROUTES.Home);
    }

    if (customErr.desc.status === HTTP_CODES.NOT_FOUND) {
      router.go(ROUTES.Error404);
    }

    if (customErr.desc.status === HTTP_CODES.INTERNAL_SERVER_ERROR) {
      router.go(ROUTES.Error500);
    }
  }

  return errorMessage;
};
