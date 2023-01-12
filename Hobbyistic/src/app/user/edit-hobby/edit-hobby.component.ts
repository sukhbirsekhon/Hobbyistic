import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Hobby } from 'src/app/shared/hobby.model';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-edit-hobby',
  templateUrl: './edit-hobby.component.html',
  styleUrls: ['./edit-hobby.component.css']
})
export class EditHobbyComponent implements OnInit {

  constructor(private route: ActivatedRoute, public userService: UserService) { }

  hobby: Hobby = {'name' : 'SERIOUS ERROR'}

  ngOnInit(): void {
    let id = this.route.snapshot.params['id'];
    this.userService.GetSingleHobby(id).subscribe(resp => {
      this.hobby = resp;
    });
  }

}
