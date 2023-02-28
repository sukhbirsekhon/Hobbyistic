import { Component, Input, OnInit } from '@angular/core';
import { Widgets, ExternalLinksWidget, Link, NotesWidget, TaskWidget, Task} from '../../shared/widgets.model';
import { Hobby } from '../../shared/hobby.model';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/shared/user.service';
import { WidgetsService } from 'src/app/shared/widgets.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css'],
  providers: [WidgetsService]
})
export class AddTaskComponent implements OnInit {

  constructor(public widgetService: WidgetsService, public UserService: UserService,
    private route: ActivatedRoute) { }
  hobby: Hobby = {"name" : ""};
  task: Task = {  };

  onAddTask(form: NgForm){
    if(form.invalid){return;}
    this.widgetService.addTask(this.hobby, this.task).subscribe(resp => {
      this.task = resp;
    });
  }

  ngOnInit(): void {
    this.hobby.id = this.route.snapshot.params['id'];
    this.UserService.GetSingleHobby(this.hobby).subscribe(resp => {
      this.hobby = resp;
    });
  }

}
