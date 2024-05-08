import BASE_URL from '@/api/http/BaseUrl';
import { Method } from '@/utils/enums';
import { Options } from '@/utils/interfaces';





function queryStringify(data: { [key: string]: string }): string {
  const keys = Object.keys(data);
  return keys.reduce((result, key, index) => `${result}${key}=${data[key]}${index < keys.length - 1 ? '&' : ''}`, '?');
}

type HTTPMethod = (url: string, options?: Options) => Promise<string>;

export default class HTTPTransport {
  protected endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = `${BASE_URL}${endpoint}`;
  }

  public get: HTTPMethod = (url = '/', options = {}) => {
    const query = options.data ? queryStringify(options.data as { [key: string]: string }) : '';
    return this.request(`${this.endpoint}${url}${query}`, { ...options, method: Method.Get });
  };

  public post: HTTPMethod = (url, options) =>
    this.request(`${this.endpoint}${url}`, { ...options, method: Method.Post });

  public put: HTTPMethod = (url, options) => this.request(`${this.endpoint}${url}`, { ...options, method: Method.Put });

  public patch: HTTPMethod = (url, options) =>
    this.request(`${this.endpoint}${url}`, { ...options, method: Method.Patch });

  public delete: HTTPMethod = (url, options) =>
    this.request(`${this.endpoint}${url}`, { ...options, method: Method.Delete });

  private request<Response>(url: string, options: Options = { method: Method.Get }): Promise<Response> {
    const { method, data, headers = {} } = options;

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

      xhr.withCredentials = true;
      xhr.responseType = 'json';

      if (data instanceof FormData) {
        xhr.send(data);
      } else {
        headers['Content-Type'] = headers['Content-Type'] || 'application/json';
        Object.keys(headers).forEach((key) => {
          xhr.setRequestHeader(key, headers[key]);
        });
        xhr.send(method === Method.Get ? null : JSON.stringify(data));
      }
    });
  }
}