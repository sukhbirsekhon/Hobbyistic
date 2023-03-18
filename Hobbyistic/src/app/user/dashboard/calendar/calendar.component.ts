import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { Widgets, Event, CalendarWidget } from '../../../shared/widgets.model';
import { Hobby } from 'src/app/shared/hobby.model';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/shared/user.service';
import { WidgetsService } from 'src/app/shared/widgets.service';
import { ActivatedRoute, Router } from '@angular/router';


import { CalendarOptions, EventClickArg} from '@fullcalendar/core'; // useful for typechecking
import dayGridPlugin from '@fullcalendar/daygrid';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
  providers: [UserService, WidgetsService]
})
export class CalendarComponent implements OnInit {

  constructor(public widgetService: WidgetsService, public UserService: UserService,
    private route: ActivatedRoute, private router: Router) { }

  isCalendarVisible: boolean = true;
  isAddFormVisible: boolean = false;
  isEditFormVisible: boolean = false;

  hobby: Hobby = {"name" : ""};
  event: Event = {  };
  events: Event[] = [];
  calendarWidget: CalendarWidget = {};
  widgets: Widgets = {};

  ngOnInit(): void {
    
    this.hobby.id = this.route.snapshot.params['id'];
    this.UserService.GetSingleHobby(this.hobby).subscribe(resp => {
      this.hobby = resp;
    });

    this.widgetService.getWidgets(this.hobby).subscribe(res => {
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
    customButtons: {
      addEvent: {
        text: 'New Event',
        click: () => this.NewEvent()
      }
    },
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

  NewEvent() {
    this.isAddFormVisible = true;
    this.isCalendarVisible = false;
  }

  customFunction(){
    alert('Custom Function Called')
  }

  handleEventClick(clickInfo: EventClickArg) {
    this.isEditFormVisible = true;
    this.isCalendarVisible = false;
    this.event = this.events?.find( Event => Event._id === clickInfo.event.id )!;
    console.log(clickInfo.event)
    console.log(clickInfo.event.id)
  }

  backtoCalendar(): void
  {
    this.isCalendarVisible = true;
    this.isAddFormVisible = false;
    this.isEditFormVisible = false;
  }

  onAddEvent(form: NgForm){
    if(form.invalid){return;}
    this.widgetService.addEvent(this.hobby, this.event).subscribe(resp => {
      this.event = resp;
    });
    window.location.reload();
  }

  onEditEvent(form: NgForm){
    if(form.invalid){return;}
    this.widgetService.updateEvent(this.hobby, this.event).subscribe(event => {
      this.event = event;
    });
    window.location.reload();
  }

  deleteEvent(): void {
    this.widgetService.deleteEvent(this.hobby, this.event).subscribe(res => {
      console.log(res)
    });
    window.location.reload();
  }

}
