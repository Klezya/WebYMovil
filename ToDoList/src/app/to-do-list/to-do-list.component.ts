import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface TodoItem {
  id: number;
  task: string;
  completed: boolean;
}


@Component({
  selector: 'app-to-do-list',
  standalone: true,
  imports: [ CommonModule, FormsModule ],
  templateUrl: './to-do-list.component.html',
  styleUrl: './to-do-list.component.css'
})




export class TodoListComponent implements OnInit {
  todoList: TodoItem[] = [];
  newTask: string = '';
  
  @ViewChild('todoText') 
  todoInputRef: ElementRef<HTMLInputElement> = null!;
  
  constructor() { }
  
  ngOnInit(): void {
    const storedTodoList = localStorage.getItem('todoList');
    if (storedTodoList) {
      this.todoList = JSON.parse(storedTodoList);
    }
  }
  
  addTask(text: string): void {
    if (text.trim() !== '') {
      const newTodoItem: TodoItem = {
        id: Date.now(),
        task: text.trim(),
        completed: false
      };
      this.todoList.push(newTodoItem);
      this.todoInputRef.nativeElement.value = '';
      this.saveTodoList();
    }
  }
  
  deleteTask(id: number): void {
    this.todoList = this.todoList.filter(item => item.id !== id);
    this.saveTodoList();
  }
  
  toggleCompleted(id: number): void {
    const todoItem = this.todoList.find(item => item.id === id);
    if (todoItem) {
      todoItem.completed = !todoItem.completed;
      this.saveTodoList();
    }
  }
  
  saveTodoList(): void {
    localStorage.setItem('todoList', JSON.stringify(this.todoList));
  }
}
