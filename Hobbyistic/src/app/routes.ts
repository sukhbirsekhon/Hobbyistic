import { Routes } from "@angular/router";
import { UserComponent } from "./user/user.component";
import { SignUpComponent } from "./user/sign-up/sign-up.component";
import { LoginComponent } from "./user/login/login.component";
import { MainComponent } from "./user/main/main.component";
import { AddHobbyComponent } from "./user/add-hobby/add-hobby.component";
import { EditHobbyComponent } from "./user/edit-hobby/edit-hobby.component";
import { DashboardComponent } from "./user/dashboard/dashboard.component";

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
    path: 'edit-hobby', component: UserComponent,
    children: [{ path: '', component: EditHobbyComponent}]
  },
  {
    path: 'dashboard', component: UserComponent,
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
    path: '', redirectTo: '/edit-hobby', pathMatch: 'full'
  },
  {
    path: '', redirectTo: '/dashboard', pathMatch: 'full'
  }


]
