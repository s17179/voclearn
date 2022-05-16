import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlreadyAuthenticatedGuard } from './guards/already-authenticated.guard';
import { AuthGuard } from './guards/auth.guard';

@NgModule({
  imports: [CommonModule],
  providers: [AlreadyAuthenticatedGuard, AuthGuard],
})
export class VoclearnAuthApiModule {}
