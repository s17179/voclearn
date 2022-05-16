import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import {
  UpdateWordGroupRequestContract,
  WordContract,
  WordGroupContract,
} from '@voclearn/contracts';
import { MatDialog } from '@angular/material/dialog';
import { WordGroupService } from '@voclearn/voclearn/vocabulary/api';
import { NewWordGroupDialogComponent } from './new-word-group-dialog/new-word-group-dialog.component';
import { FormGroup } from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';
import { EditWordGroupDialogComponent } from './edit-word-group-dialog/edit-word-group-dialog.component';

@Component({
  selector: 'voclearn-word-group',
  templateUrl: './word-group.component.html',
  styleUrls: ['./word-group.component.scss'],
})
export class WordGroupComponent implements OnInit {
  displayedColumns: string[] = ['name', 'actions'];
  dataSource = new MatTableDataSource<WordGroupContract>();

  constructor(
    private readonly dialog: MatDialog,
    private readonly wordGroupService: WordGroupService
  ) {}

  ngOnInit(): void {
    this.wordGroupService.getList().subscribe((wordGroups) => {
      this.dataSource.data = wordGroups;
    });
  }

  onAddWordGroupButtonClicked(): void {
    const dialog = this.dialog.open(NewWordGroupDialogComponent);

    dialog.afterClosed().subscribe((form?: FormGroup) => {
      if (form !== undefined && form.valid) {
        const contract: WordGroupContract = {
          id: uuidv4(),
          name: form.value.name,
        };

        this.wordGroupService.create(contract).subscribe(() => {
          this.dataSource.data.push({
            id: contract.id,
            name: contract.name,
          });

          // eslint-disable-next-line no-self-assign
          this.dataSource.data = this.dataSource.data;
        });
      }
    });
  }

  onDeleteWordGroupButtonClicked(wordGroupId: string): void {
    this.wordGroupService.delete(wordGroupId).subscribe(() => {
      this.dataSource.data = this.dataSource.data.filter(
        (wordGroup: WordGroupContract) => wordGroup.id !== wordGroupId
      );
    });
  }

  onEditWordGroupButtonClicked(wordGroup: WordGroupContract): void {
    const dialog = this.dialog.open(EditWordGroupDialogComponent, {
      data: wordGroup,
    });

    dialog.afterClosed().subscribe((form?: FormGroup) => {
      if (form !== undefined && form.valid) {
        const newName: string = form.value.name;

        const name = newName === wordGroup.name ? undefined : newName;

        const hasAnythingChanged = name !== undefined;

        if (hasAnythingChanged) {
          const contract: UpdateWordGroupRequestContract = {
            name,
          };

          this.wordGroupService.update(wordGroup.id, contract).subscribe(() => {
            const index = this.dataSource.data.findIndex(
              (value: WordGroupContract) => value.id === wordGroup.id
            );

            if (name !== undefined) {
              this.dataSource.data[index].name = name;
            }
          });
        }
      }
    });
  }
}
