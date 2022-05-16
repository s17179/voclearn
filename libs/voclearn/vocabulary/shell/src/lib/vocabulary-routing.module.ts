import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@voclearn/voclearn/auth/api';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    children: [
      {
        path: 'words',
        loadChildren: () =>
          import('@voclearn/voclearn/vocabulary/ui/word').then(
            (m) => m.VoclearnVocabularyUiWordModule
          ),
      },
      {
        path: 'word-groups',
        loadChildren: () =>
          import('@voclearn/voclearn/vocabulary/ui/word-group').then(
            (m) => m.VoclearnVocabularyUiWordGroupModule
          ),
      },
      {
        path: 'quiz',
        loadChildren: () =>
          import('@voclearn/voclearn/vocabulary/ui/quiz').then(
            (m) => m.VoclearnVocabularyUiQuizModule
          ),
      },
      {
        path: '**',
        redirectTo: 'words',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VocabularyRoutingModule {}
