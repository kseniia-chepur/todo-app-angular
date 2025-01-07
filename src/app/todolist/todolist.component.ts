import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Task } from '../interface/task';
import { MatSort, Sort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-todolist',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    MatSortModule,
    MatPaginatorModule,
  ],
  templateUrl: './todolist.component.html',
  styleUrl: './todolist.component.scss',
})
export class TodolistComponent implements OnInit {
  tasks: Task[] = [];
  displayedColumns: string[] = [
    'description',
    'isCompleted',
    'Edit',
    'Save',
    'Delete',
  ];
  dataSource: MatTableDataSource<Task>;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.getFromLocalStorage();
    this.dataSource = new MatTableDataSource(this.tasks);
  }

  getFromLocalStorage() {
    const tasksFromLocalStorage = localStorage.getItem('tasks');
    if (tasksFromLocalStorage) {
      this.tasks = JSON.parse(tasksFromLocalStorage);
    }
  }

  storeInLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  handleSubmit(form: NgForm) {
    this.tasks.push({
      description: form.controls['task'].value,
      isCompleted: false,
      isEditable: false,
    });

    this.dataSource._updateChangeSubscription();
    this.storeInLocalStorage();

    form.reset();
  }

  handleStatusChange(index: number, status: boolean) {
    this.tasks[index].isCompleted = status;

    this.storeInLocalStorage();
  }

  handleEdit(index: number) {
    this.tasks[index].isEditable = true;

    this.storeInLocalStorage();
  }

  handleSave(index: number) {
    this.tasks[index].isEditable = false;

    this.storeInLocalStorage();
  }

  handleDelete(index: number) {
    this.tasks.splice(index, 1);

    this.dataSource._updateChangeSubscription();
    this.storeInLocalStorage();
  }
}
