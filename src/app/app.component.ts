import { Component } from '@angular/core';

const todos = [
  {id: 1, title: 'HTML & CSS', completed: true},
  {id: 2, title: 'JS', completed: true},
  {id: 3, title: 'React', completed: true},
  {id: 4, title: 'Angular', completed: false}
]

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent {
  title = 'todo-app-angular';
  isEdited = false;
  todos = todos;

  handleTodoToggle(e: Event, todo: Todo) {
    todo.completed = (e.target as HTMLInputElement).checked;
  }

  delItem() {
    console.log('x');
  }
}
