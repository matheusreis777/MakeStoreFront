import { Injectable, inject } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { StorageService } from '../services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(private storage: StorageService, private router: Router) {}

  canActivate(): boolean {
    if (typeof window === 'undefined') {
      return false; // Bloqueia acesso no SSR
    }

    const token = this.storage.getData('token');
    if (token) {
      return true; 
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
