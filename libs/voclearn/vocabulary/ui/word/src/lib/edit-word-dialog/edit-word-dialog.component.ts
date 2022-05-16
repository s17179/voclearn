import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { WordContract, WordGroupContract } from '@voclearn/contracts';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WordGroupService } from '@voclearn/voclearn/vocabulary/api';

@Component({
  selector: 'voclearn-edit-word-dialog',
  templateUrl: './edit-word-dialog.component.html',
  styleUrls: ['./edit-word-dialog.component.scss'],
})
export class EditWordDialogComponent implements OnInit {
  form: FormGroup;
  wordGroups: WordGroupContract[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public word: WordContract,
    private readonly formBuilder: FormBuilder,
    private readonly wordGroupService: WordGroupService
  ) {
    this.form = this.formBuilder.group({
      word: [word.value, [Validators.required]],
      translation: [word.translation, [Validators.required]],
      associationNote: [word.association.note, [Validators.required]],
      wordGroup: [word.wordGroup, [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.wordGroupService.getList().subscribe((wordGroups) => {
      this.wordGroups = wordGroups;
    });
  }

  compare(
    wordGroup1: WordGroupContract,
    wordGroup2: WordGroupContract
  ): boolean {
    return wordGroup1.id === wordGroup2.id;
  }
}
