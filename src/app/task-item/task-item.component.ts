import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../models/task.model';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss']
})
export class TaskItemComponent {

  @Input() task: Task;
  @Output() selectTask = new EventEmitter();
  @Output() performTask = new EventEmitter();

  executeAction(action: string): void {
    this[action].emit(this.task);
  }
}
