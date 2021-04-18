import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Task } from '../models/task.model';
import { TaskService } from '../services/task.service';
import { TaskDialogComponent } from '../task-dialog/task-dialog.component';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {

  tasks$: Observable<Task[]>;
  selectedTask: Task;
  loading = true;

  constructor(
    private taskService: TaskService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.tasks$ = this.taskService.tasks.valueChanges();
    this.tasks$.pipe().subscribe(() => this.loading = false);
  }

  onPerformTask(task: Task): void {
    task.done = !task.done;
    this.taskService.update(task);
  }

  showDialog(task?: Task): void {
    const  config: MatDialogConfig<any> = (task) ? {data: {task:task}} : null;
    this.dialog.open(TaskDialogComponent, config);
  }

  onDelete(task: Task): void {
    this.taskService.delete(task);
  }
}
