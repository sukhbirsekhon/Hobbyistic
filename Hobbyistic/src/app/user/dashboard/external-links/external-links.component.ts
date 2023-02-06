import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/user.service';
import { WidgetsService } from 'src/app/shared/widgets.service';
import { Link } from 'src/app/shared/widgets.model';
import { Hobby } from 'src/app/shared/hobby.model';
import { ActivatedRoute } from '@angular/router';
import { ExternalLinksWidget } from 'src/app/shared/widgets.model';
import { Widgets, TaskWidget, Task, NotesWidget } from 'src/app/shared/widgets.model';

@Component({
  selector: 'app-external-links',
  templateUrl: './external-links.component.html',
  styleUrls: ['./external-links.component.css'],
  providers: [UserService]
})
export class ExternalLinksComponent implements OnInit {

  constructor(private route: ActivatedRoute, public WidgetService: WidgetsService, public UserService: UserService) { }

  widgets: Widgets = { };
  hobby: Hobby = {"name" : ""};
  //hobbies: Hobby[] = []; 

  ngOnInit(): void {

    this.hobby.id = this.route.snapshot.params['id'];
    this.UserService.GetSingleHobby(this.hobby).subscribe(resp => {
      this.hobby = resp;
    });

    this.WidgetService.getExternalLinks(this.hobby).subscribe(response => {
      console.log(response);  
      this.widgets = response;
      console.log(this.widgets);
        //this.links = this.externalLinksList.links[1];
    });
  }

}
