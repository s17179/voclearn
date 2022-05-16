import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssociationDialogComponent } from './association-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  declarations: [AssociationDialogComponent],
})
export class VoclearnVocabularyUiAssociationDialogModule {}
