import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  // Observable and subscriber for previous url
  private filter_location = new BehaviorSubject<any>(null);
  public filter_location$ = this.filter_location.asObservable();

  getItem<T>(key: string): Promise<T> {
    const value = JSON.parse(localStorage.getItem(key) || '{}');
    return Promise.resolve(value);
  }

  setItem<T>(key: string, value: T): Promise<void> {
    const result = localStorage.setItem(key, JSON.stringify(value));
    return Promise.resolve(result);
  }

  removeItem(key: string): Promise<void> {
    return Promise.resolve(localStorage.removeItem(key));
  }

  clearLocalStorage(): Promise<void> {
    return Promise.resolve(localStorage.clear());
  }
}
