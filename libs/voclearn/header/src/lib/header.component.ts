import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '@voclearn/voclearn/auth/api';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'voclearn-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthorized = false;
  private isAuthorizedSubscription!: Subscription;

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.isAuthorizedSubscription = this.authService.isAuthorized.subscribe(
      (value) => (this.isAuthorized = value)
    );
  }

  ngOnDestroy(): void {
    this.isAuthorizedSubscription.unsubscribe();
  }

  onLogoutButtonClicked(): void {
    this.authService.logout();

    this.router.navigate(['/auth/login']);
  }
}
