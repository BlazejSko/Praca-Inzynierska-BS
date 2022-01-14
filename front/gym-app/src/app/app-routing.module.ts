import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ClassesListComponent } from './shared/classes-list/classes-list.component';
import { ClassroomsComponent } from './shared/classrooms/classrooms.component';
import { HomePageComponent } from './shared/layout/home-page/home-page.component';
import { LoginComponent } from './shared/login/login.component';
import { RegisterComponent } from './shared/register/register.component';

const routes: Routes = [
  { path: '', component: HomePageComponent},
  { path: 'trainings', component: ClassesListComponent},
  { path: 'classrooms', component: ClassroomsComponent},
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
