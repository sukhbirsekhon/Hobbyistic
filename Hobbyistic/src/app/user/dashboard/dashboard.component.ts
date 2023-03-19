import { HttpResponseBase } from '@angular/common/http';
import { Component, OnInit, Output } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { Hobby } from 'src/app/shared/hobby.model';
import { UserService } from 'src/app/shared/user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [UserService]
})
export class DashboardComponent implements OnInit {

  constructor(private route: ActivatedRoute, public userService: UserService) { }

  hobby: Hobby = {'name' : ''}

  ngOnInit(): void {

    this.hobby.id = this.route.snapshot.params['id'];
    this.userService.GetSingleHobby(this.hobby).subscribe(resp => {
      this.hobby = resp;
    });
  }

  searchResults(querySearch: String)
  {

  }

}
