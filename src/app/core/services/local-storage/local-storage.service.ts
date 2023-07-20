import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
    // constructor(private localStorage: Storage) {}

  // Observable and subscriber for previous url
  private filter_location = new BehaviorSubject<any>(null);
  public filter_location$ = this.filter_location.asObservable();

  public getItem<T>(key: string): Promise<T> {
    const value = JSON.parse(localStorage.getItem(key) || '{}');
    return Promise.resolve(value);
  }

  public setItem<T>(key: string, value: T): Promise<void> {
    const result = localStorage.setItem(key, JSON.stringify(value));
    return Promise.resolve(result);
  }

  public removeItem(key: string): Promise<void> {
    return Promise.resolve(localStorage.removeItem(key));
  }

  public clearLocalStorage(): Promise<void> {
    return Promise.resolve(localStorage.clear());
  }
  
  // public get(key: string): any {
  //   return this.localStorage.getItem(key);
  // }

  // public set(key: string, value: any): void {
  //   this.localStorage.setItem(key, value);
  // }

  // public remove(key: string): void {
  //   this.localStorage.removeItem(key);
  // }

  // public clear(): void {
  //   this.localStorage.clear();
  // }
}
