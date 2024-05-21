import EventBus from '@/core/EventBus';

class WebSocket extends EventBus {
  private url: string;

  private ws?: WebSocket;

  constructor(url: string) {
    super();
    this.url = url;
  }

  public send(data: unknown): void {
    if (!this.ws) {
      throw new Error('Socket is not connected');
    }

    this.ws.send(data);
  }

  public connect(): void {
    if (this.ws) {
      throw new Error('Socket is already connected');
    }

    this.ws = new WebSocket(this.url);
  }

  public close(): void {
    if (!this.ws) {
      return;
    }

    this.ws.close();
  }
}

export default WebSocket;
