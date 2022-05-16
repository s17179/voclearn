import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { WordGroupContract } from '@voclearn/contracts';

@Component({
  selector: 'voclearn-edit-word-group-dialog',
  templateUrl: './edit-word-group-dialog.component.html',
  styleUrls: ['./edit-word-group-dialog.component.scss'],
})
export class EditWordGroupDialogComponent {
  form: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public wordGroup: WordGroupContract,
    private readonly formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group({
      name: [wordGroup.name, [Validators.required]],
    });
  }
}
