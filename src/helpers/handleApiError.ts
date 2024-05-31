import { ApiError } from '@/utils/interfaces';

export const handleApiError = (error: unknown): string => {
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

  return errorMessage;
};
