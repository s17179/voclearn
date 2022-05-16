import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WordComponent } from './word.component';
import { RouterModule, Routes } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { NewWordDialogComponent } from './new-word-dialog/new-word-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { EditWordDialogComponent } from './edit-word-dialog/edit-word-dialog.component';

const routes: Routes = [
  {
    path: '',
    component: WordComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
  ],
  declarations: [
    WordComponent,
    NewWordDialogComponent,
    EditWordDialogComponent,
  ],
})
export class VoclearnVocabularyUiWordModule {}
