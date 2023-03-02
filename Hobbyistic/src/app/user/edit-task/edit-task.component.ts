import { Component, OnInit } from '@angular/core';
import { Hobby } from 'src/app/shared/hobby.model';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/shared/user.service';
import { WidgetsService } from 'src/app/shared/widgets.service';
import { Widgets, ExternalLinksWidget, Link, NotesWidget, TaskWidget, Task} from '../../shared/widgets.model';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent implements OnInit {

  constructor(private route: ActivatedRoute, public UserService: UserService,
    public widgetService: WidgetsService, private router: Router) { }

  hobby: Hobby = {"name" : ""};
  task: Task = {  };
  widgets: Widgets = {};

  ngOnInit(): void {
    this.hobby.id = this.route.snapshot.params['id'];
    this.UserService.GetSingleHobby(this.hobby).subscribe(resp => {
      this.hobby = resp;
    });


    this.widgetService.getWidgets(this.hobby).subscribe(resp => {
      // console.log(JSON.parse(resp))
      this.task = resp;
      console.log('spmeti')
      console.log(resp)
    })
  }

  onEditTask(form: NgForm){
    this.task._id = this.route.snapshot.params['taskid'];
    if(form.invalid){return;}
    this.widgetService.updateTask(this.hobby, this.task).subscribe(task => {
      this.task = task;
    });
    this.router.navigate(['/checklist/' + this.hobby.id]);
  }

}
