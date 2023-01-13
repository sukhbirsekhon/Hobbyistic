import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Hobby } from 'src/app/shared/hobby.model';
import { UserService } from 'src/app/shared/user.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-edit-hobby',
  templateUrl: './edit-hobby.component.html',
  styleUrls: ['./edit-hobby.component.css']
})
export class EditHobbyComponent implements OnInit {

  constructor(private route: ActivatedRoute, public userService: UserService, private router: Router) { }

  hobby: Hobby = {'name' : ''}

  ngOnInit(): void {
    this.hobby.id = this.route.snapshot.params['id'];
    this.userService.GetSingleHobby(this.hobby).subscribe(resp => {
      this.hobby = resp;
    });
  }

  onEditHobby(form: NgForm){
    if(form.invalid){return;}
    this.userService.updateHobby(this.hobby).subscribe(hobby => {
      this.hobby = hobby;
    });
    this.router.navigate(['/main']);
  }

  deleteHobby(): void {
    this.userService.deleteHobby(this.hobby).pipe(
      catchError(error => {
        return of();
      })
    ).subscribe();
  }
}
