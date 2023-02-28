import { Component, OnInit } from '@angular/core';
import { Widgets, ExternalLinksWidget, Link, NotesWidget, TaskWidget, Task} from '../../shared/widgets.model';
import { Hobby } from '../../shared/hobby.model';
import { NgForm } from '@angular/forms';

import { WidgetsService } from 'src/app/shared/widgets.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css'],
  providers: [WidgetsService]
})
export class AddTaskComponent implements OnInit {

  constructor(public widgetService: WidgetsService) { }

  onAddTask(form: NgForm){
    if(form.invalid){return;}
    // this.widgetService.addTask();
  }

  ngOnInit(): void {

  }

}
