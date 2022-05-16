import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { map, Observable, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AlreadyAuthenticatedGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.authService.isAuthorized.pipe(
      tap((isAuthenticated) => {
        if (isAuthenticated) {
          this.router.navigate(['/vocabulary']);
        }
      }),
      map((value: boolean) => !value)
    );
  }
}
