import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthLocalStorage {
  private static IS_AUTHENTICATED_KEY = 'is-authenticated';

  setAuthenticated(): void {
    localStorage.setItem(AuthLocalStorage.IS_AUTHENTICATED_KEY, '1');
  }

  removeAuthenticated(): void {
    localStorage.removeItem(AuthLocalStorage.IS_AUTHENTICATED_KEY);
  }

  hasAuthenticated(): boolean {
    const isAuthenticated = localStorage.getItem(
      AuthLocalStorage.IS_AUTHENTICATED_KEY
    );

    return isAuthenticated !== null;
  }
}
