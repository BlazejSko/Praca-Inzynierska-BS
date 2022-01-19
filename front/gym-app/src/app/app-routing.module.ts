import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './shared/auth.guard';

import { ClassesListComponent } from './modules/user/classes-list/classes-list.component';
import { ClassroomsComponent } from './modules/trainer/classrooms/classrooms.component';
import { HomePageComponent } from './shared/layout/home-page/home-page.component';
import { LoginComponent } from './modules/auth/login/login.component';
import { RegisterComponent } from './modules/auth/register/register.component';
import { UserClassesComponent } from './modules/user/user-classes/user-classes.component';
import { UsersListComponent } from './modules/trainer/users-list/users-list.component';
import { ClassesCategoryListComponent } from './modules/user/classes-category-list/classes-category-list.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  {
    path: 'trainings/:userId',
    component: ClassesListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'classes-category',
    component: ClassesCategoryListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'classrooms',
    component: ClassroomsComponent,
    canActivate: [AuthGuard],
  },
  { path: 'userclasses/:userId', component: UserClassesComponent },
  {
    path: 'users',
    component: UsersListComponent,
    canActivate: [AuthGuard],
  },

  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
