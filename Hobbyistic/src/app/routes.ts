import { Routes } from "@angular/router";
import { UserComponent } from "./user/user.component";
import { SignUpComponent } from "./user/sign-up/sign-up.component";
import { LoginComponent } from "./user/login/login.component";
import { MainComponent } from "./user/main/main.component";

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
    path: '', redirectTo: '/login', pathMatch: 'full'
  },
  {
    path: '', redirectTo: '/main', pathMatch: 'full'
  }

]
