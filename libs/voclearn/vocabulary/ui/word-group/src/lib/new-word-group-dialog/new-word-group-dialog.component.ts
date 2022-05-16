import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'voclearn-new-word-group-dialog',
  templateUrl: './new-word-group-dialog.component.html',
  styleUrls: ['./new-word-group-dialog.component.scss'],
})
export class NewWordGroupDialogComponent {
  form: FormGroup;

  constructor(private readonly formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      name: [null, [Validators.required]],
    });
  }
}
