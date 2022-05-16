import { Component, OnInit } from '@angular/core';
import {
  AssociationContract,
  CreateWordRequestContract,
  UpdateWordRequestContract,
  WordContract,
  WordGroupContract,
} from '@voclearn/contracts';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { WordService } from '@voclearn/voclearn/vocabulary/api';
import { NewWordDialogComponent } from './new-word-dialog/new-word-dialog.component';
import { FormGroup } from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';
import { EditWordDialogComponent } from './edit-word-dialog/edit-word-dialog.component';
import { AssociationDialogComponent } from '@voclearn/voclearn/vocabulary/ui/association-dialog';

@Component({
  selector: 'voclearn-word',
  templateUrl: './word.component.html',
  styleUrls: ['./word.component.scss'],
})
export class WordComponent implements OnInit {
  displayedColumns: string[] = ['word', 'translation', 'wordGroup', 'actions'];
  dataSource = new MatTableDataSource<WordContract>();

  constructor(
    private readonly dialog: MatDialog,
    private readonly wordService: WordService
  ) {}

  ngOnInit(): void {
    this.wordService.getList().subscribe((words) => {
      this.dataSource.data = words;
    });
  }

  onShowAssociationButtonClicked(association: AssociationContract): void {
    this.dialog.open(AssociationDialogComponent, { data: association.note });
  }

  onDeleteWordButtonClicked(wordId: string): void {
    this.wordService.delete(wordId).subscribe(() => {
      this.dataSource.data = this.dataSource.data.filter(
        (word: WordContract) => word.id !== wordId
      );
    });
  }

  onAddWordButtonClicked(): void {
    const dialog = this.dialog.open(NewWordDialogComponent);

    dialog.afterClosed().subscribe((form?: FormGroup) => {
      if (form !== undefined && form.valid) {
        const id = uuidv4();
        const value = form.value.word;
        const translation = form.value.translation;
        const associationId = uuidv4();
        const associationNote = form.value.associationNote;
        const wordGroupId = form.value.wordGroup.id;
        const wordGroupName = form.value.wordGroup.name;

        const createWordContract: CreateWordRequestContract = {
          id,
          value,
          translation,
          associationId,
          associationNote,
          wordGroupId,
        };

        this.wordService.create(createWordContract).subscribe(() => {
          this.dataSource.data.push({
            id,
            value,
            translation,
            association: {
              id: associationId,
              note: associationNote,
            },
            wordGroup: {
              id: wordGroupId,
              name: wordGroupName,
            },
          });

          // eslint-disable-next-line no-self-assign
          this.dataSource.data = this.dataSource.data;
        });
      }
    });
  }

  onEditWordButtonClicked(word: WordContract): void {
    const dialog = this.dialog.open(EditWordDialogComponent, { data: word });

    dialog.afterClosed().subscribe((form: FormGroup) => {
      if (form !== undefined && form.valid) {
        const newValue: string = form.value.word;
        const newTranslation: string = form.value.translation;
        const newWordGroup: WordGroupContract = form.value.wordGroup;
        const newAssociationNote: string = form.value.associationNote;

        const value = newValue === word.value ? undefined : newValue;
        const translation =
          newTranslation === word.translation ? undefined : newTranslation;
        const wordGroup =
          newWordGroup.id === word.wordGroup.id ? undefined : newWordGroup;
        const associationNote =
          newAssociationNote === word.association.note
            ? undefined
            : newAssociationNote;

        const hasAnythingChanged =
          value !== undefined ||
          translation !== undefined ||
          wordGroup !== undefined ||
          associationNote !== undefined;

        if (hasAnythingChanged) {
          const contract: UpdateWordRequestContract = {
            value,
            translation,
            wordGroupId: wordGroup?.id,
            associationNote: associationNote,
          };

          this.wordService.update(word.id, contract).subscribe(() => {
            const index = this.dataSource.data.findIndex(
              (value: WordContract) => value.id === word.id
            );

            if (value !== undefined) {
              this.dataSource.data[index].value = value;
            }
            if (translation !== undefined) {
              this.dataSource.data[index].translation = translation;
            }
            if (wordGroup !== undefined) {
              this.dataSource.data[index].wordGroup.id = wordGroup.id;
              this.dataSource.data[index].wordGroup.name = wordGroup.name;
            }
            if (associationNote !== undefined) {
              this.dataSource.data[index].association.note = associationNote;
            }
          });
        }
      }
    });
  }
}
