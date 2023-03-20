import { HttpResponseBase } from '@angular/common/http';
import { Component, OnInit, Output } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { Hobby } from 'src/app/shared/hobby.model';
import { UserService } from 'src/app/shared/user.service';
import { WidgetsService } from 'src/app/shared/widgets.service';
import { motivationWidgetService } from 'src/app/shared/motivationWidget.service';
import { Widgets, Task, TaskWidget, Event } from 'src/app/shared/widgets.model';
import { MotivationWidget } from 'src/app/shared/motivationWidget.model';
import { ActivatedRoute } from '@angular/router';

import { CalendarOptions, EventClickArg} from '@fullcalendar/core'; // useful for typechecking
import dayGridPlugin from '@fullcalendar/daygrid';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [UserService]
})
export class DashboardComponent implements OnInit {

  constructor(private route: ActivatedRoute, public WidgetService: WidgetsService, public motivationWidgetService: motivationWidgetService, public userService: UserService) { }

  hobby: Hobby = {'name' : ''};
  hobbyNameDisplay: String = "";
  widgets: Widgets = { };
  search: String = "";
  task: Task = {};
  taskWidget: TaskWidget = {};
  event: Event = {  };
  events: Event[] = [];
  motivation: MotivationWidget = { };
  postResponse: any;
  dbImage: any;
  publicPosts: MotivationWidget[] = [];

  ngOnInit(): void {

    this.hobby.id = this.route.snapshot.params['id'];
    this.userService.GetSingleHobby(this.hobby).subscribe(resp => {
      this.hobby = resp;
      this.hobbyNameDisplay = this.hobby.name;
    });

    this.WidgetService.getWidgets(this.hobby).subscribe(res => {
      this.task = res;
      this.widgets = res;
      console.log(res)
    })

    this.motivationWidgetService.getAllPosts(this.hobby).subscribe(response =>{ 
      this.publicPosts = response;
      for (let post of this.publicPosts) {
        this.displayImage(post);
      }
    });

    this.WidgetService.getWidgets(this.hobby).subscribe(res => {
      this.widgets = res;
      console.log(res);
      function renameKey ( obj: { [x: string]: any; }, oldKey: string | number, newKey: string | number ) {
        obj[newKey] = obj[oldKey];
        delete obj[oldKey];
      }      
      const arr = JSON.parse(JSON.stringify(res.calendarWidget?.events));
      arr.forEach( (obj: { [x: string]: any; }) => renameKey( obj, '_id', 'id' ) );
      arr.forEach( (obj: { [x: string]: any; }) => renameKey( obj, 'startDate', 'start' ) );
      arr.forEach( (obj: { [x: string]: any; }) => renameKey( obj, 'endDate', 'end' ) );
      this.calendarOptions.events = arr, ["id","title","start","end"];
      this.events = res.calendarWidget?.events!;
    });

  }

  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin],
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'addEvent'
    },
    initialView: 'dayGridMonth',
    contentHeight: 'auto',
    weekends: true,
    editable: true,
    selectMirror: true,
    dayMaxEvents: true,
    eventClick: this.handleEventClick.bind(this),
  };

  handleEventClick(clickInfo: EventClickArg) {
    this.event = this.events?.find( Event => Event._id === clickInfo.event.id )!;
    console.log(clickInfo.event)
    console.log(clickInfo.event.id)
  }

  searchResults(querySearch: String)
  {
    this.search = querySearch;

    this.WidgetService.getExternalLinksFromQuery(this.hobby, this.search).subscribe(response => {
        this.widgets = response;
    });
  }

  handleSelected(task: any){
    if(task.completed == true) {
      task.completed = false
    } else if(task.completed == false) {
      task.completed = true
    }

    this.task.task = task.task;
    this.task._id = task._id;
    this.task.completed = task.completed;
    console.log(this.task.task)
    this.WidgetService.updateTask(this.hobby, this.task).subscribe(task => {
      this.task = task;
    });

  }

  displayImage(motivationInstance: MotivationWidget) {
    this.motivation = motivationInstance;
    this.motivationWidgetService.getPostImage(this.hobby, this.motivation).subscribe(response => {
    const reader = new FileReader();
    reader.readAsDataURL(response);
    reader.onloadend = () => {
    motivationInstance.dbImage = reader.result
    };
    });
  }

  deleteEvent(): void {

    this.WidgetService.deleteEvent(this.hobby, this.event).pipe().subscribe(res => {
      console.log(res)
    });
    window.location.reload();
    
  }

}
