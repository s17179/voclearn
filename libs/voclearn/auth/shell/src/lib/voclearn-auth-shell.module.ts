import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { VoclearnAuthApiModule } from '@voclearn/voclearn/auth/api';

@NgModule({
  imports: [CommonModule, VoclearnAuthApiModule, AuthRoutingModule],
})
export class VoclearnAuthShellModule {}
