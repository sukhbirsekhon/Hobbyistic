import { HttpResponseBase } from '@angular/common/http';
import { Component, OnInit, Output } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { Hobby } from 'src/app/shared/hobby.model';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  providers: [UserService]
})
export class MainComponent implements OnInit {

  constructor(public userService: UserService) { }

  hobbies: Hobby[] = [];

  ngOnInit() {
    this.userService.GetAllHobbies().subscribe(hobbies => {
      this.hobbies = hobbies;
    });
  }

}
