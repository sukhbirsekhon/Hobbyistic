import { Component, OnInit } from '@angular/core';
import { Hobby } from 'src/app/shared/hobby.model';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/shared/user.service';
import { WidgetsService } from 'src/app/shared/widgets.service';
import { Widgets, ExternalLinksWidget, Link, NotesWidget, TaskWidget, Task} from '../../../shared/widgets.model';

@Component({
  selector: 'app-checklist',
  templateUrl: './checklist.component.html',
  styleUrls: ['./checklist.component.css'],
  providers: [UserService]
})
export class ChecklistComponent implements OnInit {

  constructor(private route: ActivatedRoute, public UserService: UserService,
    public widgetService: WidgetsService) { }

  hobby: Hobby = {"name" : ""};
  task: Task = {};
  taskWidget: TaskWidget = {};
  widgets: Widgets = {};


  ngOnInit(): void {

    this.hobby.id = this.route.snapshot.params['id'];
    this.UserService.GetSingleHobby(this.hobby).subscribe(resp => {
      this.hobby = resp;
    });

    this.task._id = this.route.snapshot.params['taskid'];

    this.widgetService.getWidgets(this.hobby).subscribe(resp => {
      // console.log(JSON.parse(resp))
      this.widgets = resp;
    })
  }

}
