import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { WordGroupComponent } from './word-group.component';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { NewWordGroupDialogComponent } from './new-word-group-dialog/new-word-group-dialog.component';
import { EditWordGroupDialogComponent } from './edit-word-group-dialog/edit-word-group-dialog.component';

const routes: Routes = [
  {
    path: '',
    component: WordGroupComponent,
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
    WordGroupComponent,
    NewWordGroupDialogComponent,
    EditWordGroupDialogComponent,
  ],
})
export class VoclearnVocabularyUiWordGroupModule {}
