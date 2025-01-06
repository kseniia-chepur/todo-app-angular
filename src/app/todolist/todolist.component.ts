import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-todolist',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatCheckboxModule, MatFormFieldModule, MatInputModule, MatButtonModule, FormsModule],
  templateUrl: './todolist.component.html',
  styleUrl: './todolist.component.scss',
})
export class TodolistComponent {
  tasks = [
    { description: 'first task', isCompleted: false, isEditable: false },
    { description: 'second task', isCompleted: true, isEditable: false },
  ];

  displayedColumns: string[] = ['description', 'isCompleted', 'Edit', 'Save', 'Delete'];
  dataSource = new MatTableDataSource(this.tasks);

  handleSubmit(form: NgForm) {
     this.tasks.push({
      description: form.controls['task'].value,
      isCompleted: false,
      isEditable: false,
    });

     this.dataSource._updateChangeSubscription();

    form.reset();
  }

  handleDelete(index: number) {
    this.tasks.splice(index, 1);
    this.dataSource._updateChangeSubscription();
  }

  handleStatusChange(index: number, status: boolean) {
    this.tasks[index].isCompleted = status;
  }

  handleEdit(index: number) {
    this.tasks[index].isEditable = true;
  }

  handleSave(index: number) {
    this.tasks[index].isEditable = false;
    this.dataSource._updateChangeSubscription();
  }
}
