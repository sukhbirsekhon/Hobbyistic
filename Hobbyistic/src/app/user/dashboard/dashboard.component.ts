import { HttpResponseBase } from '@angular/common/http';
import { Component, OnInit, Output } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { Hobby } from 'src/app/shared/hobby.model';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [UserService]
})
export class DashboardComponent implements OnInit {

  constructor(public userService: UserService) { }

  hobbies: Hobby[] = [];

  ngOnInit(): void {
    this.userService.GetAllHobbies().subscribe(hobbies => {
      this.hobbies = hobbies;
    });
  }

}
