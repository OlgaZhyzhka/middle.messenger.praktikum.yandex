import BASE_URL from '@/api/http/BaseUrl';
import { queryStringify } from '@/helpers/queryStringify';
import { ERRORS_MESSAGES, HTTP_CODES, METHODS } from '@/utils/enums';
import { HTTPMethod, Options } from '@/utils/types';

export default class HTTPTransport {
  protected endpoint: string;

  constructor(baseEndpoint = '') {
    this.endpoint = `${BASE_URL}${baseEndpoint}`;
  }

  public get: HTTPMethod = (url, options = {}) => {
    const queryString = options.data ? queryStringify(options.data as Record<string, unknown>) : '';
    const path = `${this.endpoint}${url}${queryString}`;
    return this.request(path, { ...options, method: METHODS.GET });
  };

  public post: HTTPMethod = (url, options) =>
    this.request(`${this.endpoint}${url}`, { ...options, method: METHODS.POST });

  public put: HTTPMethod = (url, options) =>
    this.request(`${this.endpoint}${url}`, { ...options, method: METHODS.PUT });

  public patch: HTTPMethod = (url, options) =>
    this.request(`${this.endpoint}${url}`, { ...options, method: METHODS.PATCH });

  public delete: HTTPMethod = (url, options) =>
    this.request(`${this.endpoint}${url}`, { ...options, method: METHODS.DELETE });

  private request<TResponse>(url: string, options: Options): Promise<TResponse> {
    const { method, data, headers = {}, withCredentials = true, timeout = 5000 } = options;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      if (!method) {
        throw new Error('Method is undefined');
      }

      xhr.open(method, url);
      xhr.timeout = timeout;
      xhr.withCredentials = withCredentials;

      if (headers && Object.keys(headers).length > 0) {
        Object.keys(headers).forEach((key) => xhr.setRequestHeader(key, headers[key]));
      }

      xhr.onload = (): void => {
        const contentType = xhr.getResponseHeader('Content-Type');
        let response: TResponse;
        try {
          if (contentType && contentType.includes('application/json')) {
            response = JSON.parse(xhr.responseText);
          } else {
            response = xhr.responseText as unknown as TResponse;
          }

          const responseWithStatus = { status: xhr.status, data: response };

          if (xhr.status >= HTTP_CODES.OK && xhr.status < HTTP_CODES.REDIRECT) {
            resolve(responseWithStatus as unknown as TResponse);
          } else if (
            xhr.status === HTTP_CODES.BAD_REQUEST &&
            JSON.parse(xhr.response).reason === ERRORS_MESSAGES.USER_IN_SYSTEM
          ) {
            resolve(responseWithStatus as unknown as TResponse);
          }
        } catch (error: unknown) {
          if (error instanceof Error) {
            reject(error.message);
          }
          console.log(error);
        }
      };

      xhr.onerror = (): void => reject(new Error(ERRORS_MESSAGES.NETWORK));
      xhr.onabort = (): void => reject(new Error(ERRORS_MESSAGES.ABORTED));
      xhr.ontimeout = (): void => reject(new Error(ERRORS_MESSAGES.TIMEOUT));

      if (method === 'GET' || !data) {
        xhr.send();
      } else if (data instanceof FormData) {
        xhr.send(data);
      } else {
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(data));
      }
    });
  }
}
