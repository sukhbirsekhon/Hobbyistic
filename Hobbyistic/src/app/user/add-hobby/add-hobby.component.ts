import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-add-hobby',
  templateUrl: './add-hobby.component.html',
  styleUrls: ['./add-hobby.component.css'],
  providers: [UserService]
})
export class AddHobbyComponent implements OnInit {

  constructor(public userService: UserService) { }

  onAddHobby(form: NgForm){
    if(form.invalid){return;}
    this.userService.AddHobby(form.value.name);
  }

  ngOnInit(): void {
  }

}
