import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-edit-hobby',
  templateUrl: './edit-hobby.component.html',
  styleUrls: ['./edit-hobby.component.css'],
  providers: [UserService]
})
export class EditHobbyComponent implements OnInit {

  constructor(public userService: UserService) { }

  onEditHobby(form: NgForm) {
    if(form.invalid){return;}
    this.userService.EditHobby(form.value.name, form.value.name)
  }

  ngOnInit(): void {
  }

}
