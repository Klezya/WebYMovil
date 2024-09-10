import { Component, OnInit } from '@angular/core';
import { TodoService } from '../todo.service';


@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
})
export class TodoComponent implements OnInit {
  tareas: any[] = [];
  nuevaTarea: string = '';

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    // Obtener las tareas de Firebase
    this.todoService.getTareas().subscribe((data) => {
      this.tareas = data;
    });
  }

  agregarTarea() {
    if (this.nuevaTarea.trim()) {
      const tarea = { nombre: this.nuevaTarea };
      this.todoService.addTarea(tarea);
      this.nuevaTarea = '';
    }
  }

  borrarTarea(id: string) {
    this.todoService.deleteTarea(id);
  }
}
