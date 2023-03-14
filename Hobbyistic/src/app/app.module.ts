import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';

import { appRoutes } from './routes';
import { LoginComponent } from './user/login/login.component';
import { DashboardComponent } from './user/dashboard/dashboard.component';
import { MainComponent } from './user/main/main.component';
import { SettingsComponent } from './user/settings/settings.component';
import { CalendarComponent } from './user/dashboard/calendar/calendar.component';
import { ChecklistComponent } from './user/dashboard/checklist/checklist.component';
import { StatisticsComponent } from './user/dashboard/statistics/statistics.component';
import { ExternalLinksComponent } from './user/dashboard/external-links/external-links.component';
import { MotivationComponent } from './user/dashboard/motivation/motivation.component';
import { AddHobbyComponent } from './user/add-hobby/add-hobby.component';
import { EditHobbyComponent } from './user/edit-hobby/edit-hobby.component';
import { AddPostComponent } from './user/add-post/add-post.component';
import { AddTaskComponent } from './user/add-task/add-task.component';
import { EditTaskComponent } from './user/edit-task/edit-task.component';


@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    SignUpComponent,
    LoginComponent,
    DashboardComponent,
    MainComponent,
    SettingsComponent,
    CalendarComponent,
    ChecklistComponent,
    StatisticsComponent,
    ExternalLinksComponent,
    MotivationComponent,
    AddHobbyComponent,
    EditHobbyComponent,
    AddPostComponent
    AddTaskComponent,
    EditTaskComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
