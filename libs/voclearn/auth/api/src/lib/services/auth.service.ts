import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, Observable, of, tap } from 'rxjs';
import {
  LoginRequestContract,
  RegisterRequestContract,
} from '@voclearn/contracts';
import { AuthLocalStorage } from './auth.local-storage';
import { CookieService } from 'ngx-cookie-service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  isAuthorized: BehaviorSubject<boolean>;

  constructor(
    private readonly httpClient: HttpClient,
    private readonly authLocalStorage: AuthLocalStorage,
    private readonly cookieService: CookieService
  ) {
    this.isAuthorized = new BehaviorSubject<boolean>(
      this.authLocalStorage.hasAuthenticated()
    );
  }

  authenticate(contract: LoginRequestContract): Observable<void> {
    return this.httpClient.post<void>('/api/auth/login', contract).pipe(
      tap(() => {
        this.authLocalStorage.setAuthenticated();

        this.isAuthorized.next(true);
      }),
      catchError((error) => {
        console.error(error);
        return of(error);
      })
    );
  }

  register(contract: RegisterRequestContract): Observable<void> {
    return this.httpClient.post<void>('/api/auth/register', contract).pipe(
      catchError((error) => {
        console.error(error);
        return of(error);
      })
    );
  }

  logout(): void {
    this.authLocalStorage.removeAuthenticated();

    this.cookieService.delete('isAuthenticated', '/');

    this.isAuthorized.next(false);
  }
}
