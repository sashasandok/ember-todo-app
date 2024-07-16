import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { v4 } from 'ember-uuid';

class Todo {
  @tracked id = v4();
  @tracked text = '';
  @tracked isCompleted = false;

  constructor(text) {
    this.text = text;
  }
}

export default class TodoDataService extends Service {
  @tracked todos = [];
  @tracked isAllCompleted = false;

  @action
  add(text) {
    let newTodo = new Todo(text);

    this.todos = [...this.todos, newTodo];
  }

  @action
  clearCompleted() {
    this.todos = this.incomplete;
    this.isAllCompleted = false;
  }

  @action
  toggleCompletion(todo) {
    todo.isCompleted = !todo.isCompleted;
  }

  @action
  toggleAllCompletion() {
    this.isAllCompleted = !this.isAllCompleted;

    if (this.isAllCompleted) {
      this.todos = this.todos.map((item) => {
        item.isCompleted = true;
        return item;
      });
    } else {
      this.todos = this.todos.map((item) => {
        item.isCompleted = false;
        return item;
      });
    }
  }

  @action
  removeTodo(todo) {
    this.todos = this.todos.filter((item) => item.id !== todo.id);
  }

  get all() {
    return this.todos;
  }

  get incomplete() {
    return this.todos.filter((item) => !item?.isCompleted);
  }

  get todoCountIsOne() {
    return this.incomplete.length === 1;
  }

  get completed() {
    return this.todos.filter((todo) => todo.isCompleted);
  }
}
