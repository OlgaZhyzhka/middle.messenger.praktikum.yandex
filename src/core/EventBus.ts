import { Callback } from '@/utils/types';

class EventBus {
  private listeners: { [key: string]: Callback[] } = {};

  constructor() {
    this.listeners = {};
  }

  public on(event: string, callback: Callback): void {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }

    this.listeners[event].push(callback);
  }

  public off(event: string, callback: Callback): void {
    if (!this.listeners[event]) {
      throw new Error(`Event not found: ${event}`);
    }

    this.listeners[event] = this.listeners[event].filter((listener) => listener !== callback);
  }

  /* eslint-disable @typescript-eslint/no-explicit-any */
  public emit(event: string, ...args: any[]): void {
    if (!this.listeners[event]) {
      throw new Error(`Event not found: ${event}`);
    }

    this.listeners[event].forEach((listener) => listener(...args));
  }
}

export default EventBus;
