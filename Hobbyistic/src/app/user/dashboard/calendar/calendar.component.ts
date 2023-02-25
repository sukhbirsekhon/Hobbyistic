import { Component, OnInit } from '@angular/core';
import { Hobby } from 'src/app/shared/hobby.model';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/shared/user.service';


import { CalendarOptions } from '@fullcalendar/core'; // useful for typechecking
import dayGridPlugin from '@fullcalendar/daygrid';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
  providers: [UserService]
})
export class CalendarComponent implements OnInit {

  constructor(private route: ActivatedRoute, public UserService: UserService) { }

  hobby: Hobby = {"name" : ""};

  ngOnInit(): void {
    
    this.hobby.id = this.route.snapshot.params['id'];
    this.UserService.GetSingleHobby(this.hobby).subscribe(resp => {
      this.hobby = resp;
    });
  }

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin]
  };

}
