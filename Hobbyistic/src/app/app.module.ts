import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';

import { appRoutes } from './routes';
import { LoginComponent } from './user/login/login.component';
import { DashboardComponent } from './user/main/dashboard/dashboard.component';
import { MainComponent } from './user/main/main.component';
import { SettingsComponent } from './user/main/settings/settings.component';
import { CalendarComponent } from './user/main/dashboard/calendar/calendar.component';
import { ChecklistComponent } from './user/main/dashboard/checklist/checklist.component';
import { StatisticsComponent } from './user/main/dashboard/statistics/statistics.component';
import { ExternalLinksComponent } from './user/main/dashboard/external-links/external-links.component';
import { MotivationComponent } from './user/main/dashboard/motivation/motivation.component';

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
    MotivationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
