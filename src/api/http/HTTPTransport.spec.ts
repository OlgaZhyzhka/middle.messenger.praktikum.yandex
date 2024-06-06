import { expect } from 'chai';
import sinon, { SinonFakeXMLHttpRequestStatic, SinonFakeXMLHttpRequest } from 'sinon';
import HTTPTransport from './HTTPTransport';
import { METHODS, ERRORS_MESSAGES } from '@/utils/enums';

interface TimeoutRequest {
  timeout: number;
  ontimeout: () => void;
}

describe('HTTPTransport', () => {
  let xhr: SinonFakeXMLHttpRequestStatic;
  let requests: SinonFakeXMLHttpRequest[];

  beforeEach(() => {
    xhr = sinon.useFakeXMLHttpRequest();
    requests = [];
    xhr.onCreate = (req): void => {
      requests.push(req);
    };
  });

  afterEach(() => {
    xhr.restore();
  });

  it('should make a GET request', async () => {
    const http = new HTTPTransport('/test', 'http://localhost');
    const responsePromise = http.get('/endpoint');

    expect(requests).to.have.lengthOf(1);
    const request = requests[0];
    expect(request.method).to.equal(METHODS.GET);
    expect(request.url).to.equal('http://localhost/test/endpoint');

    request.respond(200, { 'Content-Type': 'application/json' }, JSON.stringify({ data: 'test' }));

    const response = await responsePromise;
    expect(response).to.deep.equal({ status: 200, data: 'test' });
  });

  it('should make a POST request', async () => {
    const http = new HTTPTransport('/test', 'http://localhost');
    const responsePromise = http.post('/endpoint', { data: { key: 'value' } });

    expect(requests).to.have.lengthOf(1);
    const request = requests[0];
    expect(request.method).to.equal(METHODS.POST);
    expect(request.url).to.equal('http://localhost/test/endpoint');

    request.respond(201, { 'Content-Type': 'application/json' }, JSON.stringify({ data: 'created' }));

    const response = await responsePromise;
    expect(response).to.deep.equal({ status: 201, data: 'created' });
  });

  it('should handle network error', async () => {
    const http = new HTTPTransport('/test', 'http://localhost');
    const responsePromise = http.get('/endpoint');

    expect(requests).to.have.lengthOf(1);
    const request = requests[0];

    request.error();

    try {
      await responsePromise;
    } catch (error) {
      if (error instanceof Error) {
        expect(error.message).to.equal(ERRORS_MESSAGES.NETWORK);
      }
    }
  });

  it('should handle timeout error', async () => {
    const http = new HTTPTransport('/test', 'http://localhost');
    const responsePromise = http.get('/endpoint');

    expect(requests).to.have.lengthOf(1);
    const request = requests[0];

    (request as unknown as TimeoutRequest).timeout = 5000;
    (request as unknown as TimeoutRequest).ontimeout();

    try {
      await responsePromise;
    } catch (error: unknown) {
      if (error instanceof Error) {
        expect(error.message).to.equal(ERRORS_MESSAGES.TIMEOUT);
      }
    }
  });

  it('should make a PUT request', async () => {
    const http = new HTTPTransport('/test', 'http://localhost');
    const responsePromise = http.put('/endpoint', { data: { key: 'value' } });

    expect(requests).to.have.lengthOf(1);
    const request = requests[0];
    expect(request.method).to.equal(METHODS.PUT);
    expect(request.url).to.equal('http://localhost/test/endpoint');

    request.respond(200, { 'Content-Type': 'application/json' }, JSON.stringify({ data: 'updated' }));

    const response = await responsePromise;
    expect(response).to.deep.equal({ status: 200, data: 'updated' });
  });

  it('should make a PATCH request', async () => {
    const http = new HTTPTransport('/test', 'http://localhost');
    const responsePromise = http.patch('/endpoint', { data: { key: 'value' } });

    expect(requests).to.have.lengthOf(1);
    const request = requests[0];
    expect(request.method).to.equal(METHODS.PATCH);
    expect(request.url).to.equal('http://localhost/test/endpoint');

    request.respond(200, { 'Content-Type': 'application/json' }, JSON.stringify({ data: 'patched' }));

    const response = await responsePromise;
    expect(response).to.deep.equal({ status: 200, data: 'patched' });
  });

  it('should make a DELETE request', async () => {
    const http = new HTTPTransport('/test', 'http://localhost');
    const responsePromise = http.delete('/endpoint');

    expect(requests).to.have.lengthOf(1);
    const request = requests[0];
    expect(request.method).to.equal(METHODS.DELETE);
    expect(request.url).to.equal('http://localhost/test/endpoint');

    request.respond(200, { 'Content-Type': 'application/json' }, JSON.stringify({ data: 'deleted' }));

    const response = await responsePromise;
    expect(response).to.deep.equal({ status: 200, data: 'deleted' });
  });


});
