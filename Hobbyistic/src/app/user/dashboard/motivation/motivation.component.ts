import { Component, OnInit } from '@angular/core';
import { Hobby } from 'src/app/shared/hobby.model';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/shared/user.service';
import { motivationWidgetService } from 'src/app/shared/motivationWidget.service';
import { NgForm } from '@angular/forms';
import { MotivationWidget } from 'src/app/shared/motivationWidget.model';
import { of, map, Observable } from 'rxjs';
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
  isPublicVisible: boolean = false;
  isUserVisible: boolean = true;
  isPostsVisible: boolean = true;
  isDeleteFormVisible: boolean = false;
  motivation: MotivationWidget = { }
  selectedPost: MotivationWidget = { }
  postResponse: any;
  dbImage: any;

  ngOnInit(): void {
    this.hobby.id = this.route.snapshot.params['id'];
    this.UserService.GetSingleHobby(this.hobby).subscribe(response => {
      this.hobby = response;
    });

    this.motivationWidgetService.getAllPublicPosts(this.hobby).subscribe(response =>{ 
      this.publicPosts = response;
      for (let post of this.publicPosts) {
        this.displayImage(post);
      }
    });

    this.motivationWidgetService.getAllPosts(this.hobby).subscribe(response => {
      this.userPosts = response;
      for (let post of this.userPosts) {
        this.displayImage(post);
      }
    });
  }

  displayImage(motivationInstance: MotivationWidget) {
    this.motivation = motivationInstance;
    this.motivationWidgetService.getPostImage(this.hobby, this.motivation).subscribe(response => {
    const reader = new FileReader();
    reader.readAsDataURL(response);
    reader.onloadend = () => {
    motivationInstance.dbImage = reader.result
    };
    });
  }
  
  
  

  deletePost()
  {
    console.log(this.selectedPost)
    this.motivationWidgetService.deletePost(this.hobby, this.selectedPost).pipe(
      catchError(error => {
        return of();
    })
    ).subscribe();
  }

  getSinglePostInstance(motivationInstance: MotivationWidget)
  {
    this.motivationWidgetService.getSinglePost(this.hobby, motivationInstance).subscribe(resp => {
      this.selectedPost = resp;
    });
  }

  viewPublicPosts(): void
  {
    this.isPublicVisible = true;
    this.isUserVisible = false;
    console.log(this.publicPosts);
  }

  viewUserPosts(): void
  {
    this.isPublicVisible = false;
    this.isUserVisible = true;
    console.log(this.userPosts);
  }

  viewDeleteForm(): void
  {
    this.isPostsVisible = false;
    this.isDeleteFormVisible = true;
  }

  viewPosts(): void
  {
    this.isPostsVisible = true;
    this.isDeleteFormVisible = false;
  }

  reload(): void
  {
    window.location.reload();
  }

}
