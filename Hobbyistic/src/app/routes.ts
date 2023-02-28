import { Routes } from "@angular/router";
import { UserComponent } from "./user/user.component";
import { SignUpComponent } from "./user/sign-up/sign-up.component";
import { LoginComponent } from "./user/login/login.component";
import { MainComponent } from "./user/main/main.component";
import { AddHobbyComponent } from "./user/add-hobby/add-hobby.component";
import { EditHobbyComponent } from "./user/edit-hobby/edit-hobby.component";
import { DashboardComponent } from "./user/dashboard/dashboard.component";
import { ExternalLinksComponent } from "./user/dashboard/external-links/external-links.component";
import { MotivationComponent } from "./user/dashboard/motivation/motivation.component";
import { CalendarComponent } from "./user/dashboard/calendar/calendar.component";
import { ChecklistComponent } from "./user/dashboard/checklist/checklist.component";
import { AddTaskComponent } from "./user/add-task/add-task.component";

export const appRoutes: Routes = [
  {
    path: 'login', component: UserComponent,
    children: [{ path: '', component: LoginComponent }]
  },
  {
    path: 'signup', component: UserComponent,
    children: [{ path: '', component: SignUpComponent }]
  },
  {
    path: 'main', component: UserComponent,
    children: [{ path: '', component: MainComponent}]
  },
  {
    path: 'add-hobby', component: UserComponent,
    children: [{ path: '', component: AddHobbyComponent}]
  },
  {
    path: 'add-task', component: UserComponent,
    children: [{ path: '', component: AddTaskComponent}]
  },
  {
    path: 'edit-hobby/:id', component: UserComponent,
    children: [{ path: '', component: EditHobbyComponent}]
  },
  {
    path: 'dashboard/:id', component: UserComponent,
    children: [{ path: '', component: DashboardComponent}]
  },
  {
    path: 'external-links/:id', component: ExternalLinksComponent,
    children: [{ path: '', component: DashboardComponent}]
  },
  {
    path: 'motivation/:id', component: MotivationComponent,
    children: [{ path: '', component: DashboardComponent}]
  },
  {
    path: 'calendar/:id', component: CalendarComponent,
    children: [{ path: '', component: DashboardComponent}]
  },
  {
    path: 'checklist/:id', component: ChecklistComponent,
    children: [{ path: '', component: DashboardComponent}]
  },
  {
    path: '', redirectTo: '/login', pathMatch: 'full'
  },
  {
    path: '', redirectTo: '/main', pathMatch: 'full'
  },
  {
    path: '', redirectTo: '/add-hobby', pathMatch: 'full'
  },
  {
    path: '', redirectTo: '/add-task', pathMatch: 'full'
  },
  {
    path: '', redirectTo: '/edit-hobby', pathMatch: 'full'
  },
  {
    path: '', redirectTo: '/dashboard', pathMatch: 'full'
  },
  {
    path: '', redirectTo: '/signup', pathMatch: 'full'
  },
  {
    path: '', redirectTo: '/external-links', pathMatch: 'full'
  },
  {
    path: '', redirectTo: '/calendar', pathMatch: 'full'
  },
  {
    path: '', redirectTo: '/motivation', pathMatch: 'full'
  },
  {
    path: '', redirectTo: '/checklist', pathMatch: 'full'
  }


]
