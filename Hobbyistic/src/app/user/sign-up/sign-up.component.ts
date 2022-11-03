import { Component, OnInit } from '@angular/core';
import { ApiService, User } from 'src/app/core';
import { UserService } from 'src/app/core/services/user.service';



@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
  providers: [UserService]
})
export class SignUpComponent implements OnInit {
  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  constructor(public userService: UserService) { 
    console.log('shit was pressed')
    this.userService.createUser(new User())
  }

  ngOnInit(): void {
    this.userService.createUser(new User())
  }

  submitForm(): void {
    console.log('shit was pressed again')
    this.userService.createUser(new User())

  }


}
