import { Injectable } from '@angular/core';
import { IAlert } from '../interfaces/alert.type';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  messages: IAlert[] = [];

  constructor() { }

  info(message: string): void {
    const alert = { message, class: 'alert-info' };
    this.messages.push(alert);
    this.unload();
  }

  error(message: string): void {
    const alert = { message, class: 'alert-error' };
    this.messages.push(alert);
    this.unload();
  }

  success(message: string): void {
    const alert = { message, class: 'alert-success' };
    this.messages.push(alert);
    this.unload();
  }

  private unload(): void {
    setTimeout(() => {
        this.messages.shift();
      }, 3000);
  }
}
