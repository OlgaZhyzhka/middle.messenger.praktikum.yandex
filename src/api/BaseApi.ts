import HTTPTransport from '@/api/http/HTTPTransport';

class BaseApi {
  public HTTP: HTTPTransport;

  constructor(path: string) {
    this.HTTP = new HTTPTransport(path);
  }

  public create(): void {
    throw new Error('Not implemented');
  }

  public request(): void {
    throw new Error('Not implemented');
  }

  public update(): void {
    throw new Error('Not implemented');
  }

  public delete(): void {
    throw new Error('Not implemented');
  }
}

export default BaseApi;
