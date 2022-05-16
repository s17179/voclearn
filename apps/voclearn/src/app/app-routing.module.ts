import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'auth',
        loadChildren: () =>
          import('@voclearn/voclearn/auth/shell').then(
            (m) => m.VoclearnAuthShellModule
          ),
      },
      {
        path: 'vocabulary',
        loadChildren: () =>
          import('@voclearn/voclearn/vocabulary/shell').then(
            (m) => m.VoclearnVocabularyShellModule
          ),
      },
      {
        path: '**',
        redirectTo: 'vocabulary',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
