import { Component } from '@angular/core';
import { TodolistComponent } from './todolist/todolist.component';

@Component({
  selector: 'app-root',
  imports: [TodolistComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'todo-app-angular';
}
