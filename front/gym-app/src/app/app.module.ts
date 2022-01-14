import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedService } from './shared/shared.service';
import { HttpClientModule } from '@angular/common/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClassroomsComponent } from './shared/classrooms/classrooms.component';
import { AddEditClassroomComponent } from './shared/add-edid-classrooms.ts/add-edit-classroom/add-edit-classroom.component';
import { ClassesCategoryListComponent } from './shared/classes-category-list/classes-category-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UsersListComponent } from './shared/users-list/users-list.component';
import { ClassesListComponent } from './shared/classes-list/classes-list.component';
import { UserClassesComponent } from './shared/user-classes/user-classes.component';
import { HeaderComponent } from './shared/layout/header/header.component';

import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { LayoutPageComponent } from './shared/layout/layout-page/layout-page.component';
import { FooterComponent } from './shared/layout/footer/footer.component';
import { HomePageComponent } from './shared/layout/home-page/home-page.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RegisterComponent } from './shared/register/register.component';
import { LoginComponent } from './shared/login/login.component';
@NgModule({
  declarations: [
    AppComponent,
    ClassroomsComponent,
    AddEditClassroomComponent,
    ClassesCategoryListComponent,
    UsersListComponent,
    ClassesListComponent,
    UserClassesComponent,
    HeaderComponent,
    LayoutPageComponent,
    FooterComponent,
    HomePageComponent,
    RegisterComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatTableModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  providers: [SharedService],
  bootstrap: [AppComponent]
})
export class AppModule { }
