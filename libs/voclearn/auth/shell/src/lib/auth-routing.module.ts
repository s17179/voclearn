import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlreadyAuthenticatedGuard } from '@voclearn/voclearn/auth/api';

const routes: Routes = [
  {
    path: '',
    canActivate: [AlreadyAuthenticatedGuard],
    children: [
      {
        path: 'login',
        loadChildren: () =>
          import('@voclearn/voclearn/auth/ui/login').then(
            (m) => m.VoclearnAuthUiLoginModule
          ),
      },
      {
        path: 'register',
        loadChildren: () =>
          import('@voclearn/voclearn/auth/ui/register').then(
            (m) => m.VoclearnAuthUiRegisterModule
          ),
      },
      {
        path: '**',
        redirectTo: 'login',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
