import { ApiError } from '@/utils/interfaces';
import router from '@/router/Router';
import { HTTP_CODES, ROUTES } from '@/utils/enums';

export const handleResponseError = (error: ApiError): void => {
  const { status } = error;

  if (status === HTTP_CODES.NOT_FOUND) {
    router.go(ROUTES.Error404);
  }

  if (status === HTTP_CODES.INTERNAL_SERVER_ERROR) {
    router.go(ROUTES.Error500);
  }
};
