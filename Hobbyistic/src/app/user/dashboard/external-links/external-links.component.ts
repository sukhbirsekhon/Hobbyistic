import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/user.service';
import { WidgetsService } from 'src/app/shared/widgets.service';
import { Link } from 'src/app/shared/widgets.model';
import { Hobby } from 'src/app/shared/hobby.model';
import { ActivatedRoute } from '@angular/router';
import { ExternalLinksWidget } from 'src/app/shared/widgets.model';
import { Widgets, TaskWidget, Task, NotesWidget } from 'src/app/shared/widgets.model';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-external-links',
  templateUrl: './external-links.component.html',
  styleUrls: ['./external-links.component.css'],
  providers: [UserService]
})
export class ExternalLinksComponent implements OnInit {

  constructor(private route: ActivatedRoute, public WidgetService: WidgetsService, public UserService: UserService, private router: Router) { }

  widgets: Widgets = { };
  hobby: Hobby = {"name" : ""};
  search: String = "";
  //hobbies: Hobby[] = []; 

  ngOnInit(): void {

    this.hobby.id = this.route.snapshot.params['id'];
    this.UserService.GetSingleHobby(this.hobby).subscribe(resp => {
      this.hobby = resp;
    });

    this.searchResults(this.hobby.name);

    /*this.WidgetService.getExternalLinks(this.hobby).subscribe(response => {
      console.log(response);  
      this.widgets = response;
      console.log(this.widgets);
    });*/
  }

  searchResults(querySearch: String)
  {
    this.search = "How to " + querySearch;

    this.WidgetService.getExternalLinksFromQuery(this.hobby, this.search).subscribe(response => {
        this.widgets = response;
    });

    console.log(typeof this.search);
  }

}
