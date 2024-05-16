import BASE_URL from '@/api/http/BaseUrl';
import { METHODS } from '@/utils/enums';
import { HTTPMethod, Options } from '@/utils/types';

const queryStringify = (data: { [key: string]: string }): string => {
  const keys = Object.keys(data);
  return keys.reduce((result, key, index) => `${result}${key}=${data[key]}${index < keys.length - 1 ? '&' : ''}`, '?');
};



export default class HTTPTransport {
  protected endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = `${BASE_URL}${endpoint}`;
  }

  public get: HTTPMethod = (url = '/', options = {}) => {
    const query = options.data ? queryStringify(options.data as { [key: string]: string }) : '';
    return this.request(`${this.endpoint}${url}${query}`, { ...options, method: METHODS.GET });
  };

  public post: HTTPMethod = (url, options) =>
    this.request(`${this.endpoint}${url}`, { ...options, method: METHODS.POST });

  public put: HTTPMethod = (url, options) =>
    this.request(`${this.endpoint}${url}`, { ...options, method: METHODS.PUT });

  public patch: HTTPMethod = (url, options) =>
    this.request(`${this.endpoint}${url}`, { ...options, method: METHODS.PATCH });

  public delete: HTTPMethod = (url, options) =>
    this.request(`${this.endpoint}${url}`, { ...options, method: METHODS.DELETE });

  private request(url: string, options: Options = { method: METHODS.GET }): Promise<XMLHttpRequest> {
    const { method, data, withCredentials = true, headers = {} } = options;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      if (!method) {
        throw new Error('Method is undefined');
      }

      xhr.open(method, url);

      xhr.onreadystatechange = (): void => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          if (xhr.status < 400) {
            resolve(xhr.response);
          } else {
            reject(xhr.response);
          }
        }
      };

      xhr.onabort = (): void => reject(xhr.response);
      xhr.onerror = (): void => reject(xhr.response);
      xhr.ontimeout = (): void => reject(xhr.response);

      xhr.withCredentials = withCredentials;
      // xhr.responseType = 'json';
      if (headers) {
        Object.entries(headers).forEach(([key, value]) => xhr.setRequestHeader(key, value));
      }

      if (method === METHODS.GET || !data) {
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
