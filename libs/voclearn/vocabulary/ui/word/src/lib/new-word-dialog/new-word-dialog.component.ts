import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WordGroupContract } from '@voclearn/contracts';
import { WordGroupService } from '@voclearn/voclearn/vocabulary/api';

@Component({
  selector: 'voclearn-new-word-dialog',
  templateUrl: './new-word-dialog.component.html',
  styleUrls: ['./new-word-dialog.component.scss'],
})
export class NewWordDialogComponent implements OnInit {
  form: FormGroup;
  wordGroups: WordGroupContract[] = [];

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly wordGroupService: WordGroupService
  ) {
    this.form = this.formBuilder.group({
      word: [null, [Validators.required]],
      translation: [null, [Validators.required]],
      associationNote: [null, [Validators.required]],
      wordGroup: [null, [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.wordGroupService.getList().subscribe((wordGroups) => {
      this.wordGroups = wordGroups;
    });
  }
}
