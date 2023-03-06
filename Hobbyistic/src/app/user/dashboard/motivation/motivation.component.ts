import { Component, OnInit } from '@angular/core';
import { Hobby } from 'src/app/shared/hobby.model';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/shared/user.service';
import { motivationWidgetService } from 'src/app/shared/motivationWidget.service';
import { NgForm } from '@angular/forms';
import { MotivationWidget } from 'src/app/shared/motivationWidget.model';
import { of } from 'rxjs';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-motivation',
  templateUrl: './motivation.component.html',
  styleUrls: ['./motivation.component.css'],
  providers: [UserService]
})
export class MotivationComponent implements OnInit {

  constructor(private route: ActivatedRoute, public UserService: UserService, public motivationWidgetService: motivationWidgetService){ }

  hobby: Hobby = {"name" : ""};
  publicPosts: MotivationWidget[] = [] 
  userPosts: MotivationWidget[] = []
  motivation: MotivationWidget = { }
  postResponse: any;
  dbImage: any;

  ngOnInit(): void {
    
    this.hobby.id = this.route.snapshot.params['id'];
    this.UserService.GetSingleHobby(this.hobby).subscribe(response => {
      this.hobby = response;
    });

    this.motivationWidgetService.getAllPublicPosts(this.hobby).subscribe(response =>{ 
      this.publicPosts = response;
    });

    this.motivationWidgetService.getAllPosts(this.hobby).subscribe(response => {
      this.userPosts = response;
    });

  }

  displayImage(motivationInstance: MotivationWidget)
  {
    this.motivation = motivationInstance;

    this.motivationWidgetService.getPostImage(this.hobby, this.motivation).subscribe(response => {
      this.postResponse = response;
      this.dbImage = 'data:image/jpeg;base64,' + this.postResponse.image;
    });
  }

  deletePost(motivationInstance: MotivationWidget)
  {
    this.motivation = motivationInstance;
    this.motivationWidgetService.deletePost(this.hobby, this.motivation).pipe(
      catchError(error => {
        return of();
    })
    ).subscribe();
  }

}
