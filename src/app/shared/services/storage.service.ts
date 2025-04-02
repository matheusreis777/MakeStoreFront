import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root' 
})

export class StorageService {

  private storage: Storage | undefined;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { 
    if (isPlatformBrowser(this.platformId)) {
      this.storage = window.localStorage; // Só inicializa no navegador
    }
  }

  setData(nome: string, valor: string) {
    localStorage.setItem(nome, valor);
  }

  getData(nome: string): string {
    return localStorage.getItem(nome || '') || '';
  }
  
  clear() {
    localStorage.clear();
  }

  set(key: string, value: any): boolean {
    if (this.storage) {
      this.storage.setItem(key, JSON.stringify(value));
      return true;
    }
    return false;
  }

  get(key: string): any {
    if (this.storage) {
      return JSON.parse(this.storage.getItem(key || '') || '' );
    }
    return null;
  }

  remove(key: string): boolean {
    if (this.storage) {
      this.storage.removeItem(key);
      return true;
    }
    return false;
  }

  clearLocalStorage(): boolean {
    if (this.storage) {
      this.storage.clear();
      return true;
    }
    return false;
  }
}
