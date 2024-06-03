import { Listener } from "@/utils/types";

class EventBus {
  public listeners: { [key: string]: Listener[] } = {};

  constructor() {
    this.listeners = {};
  }

  public on(event: string, callback: Listener): void {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }

    this.listeners[event].push(callback);
  }

  public off(event: string, callback: Listener): void {
    if (!this.listeners[event]) {
      throw new Error(`Event not found: ${event}`);
    }

    this.listeners[event] = this.listeners[event].filter((listener) => listener !== callback);
  }

  public emit(event: string, ...args: unknown[]): void {
    if (!this.listeners[event]) {
      console.warn(`No listeners for event: ${event}`);
      return;
    }

    this.listeners[event].forEach((listener) => listener(...args));
  }
}

export default EventBus;
