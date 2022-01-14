import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { PaginatedList } from '../core/models/paginated-list-type';
import { Classroom } from '../core/models/classroom';
import { ClassesCategory } from '../core/models/classes-category-payload';
import { User } from '../core/models/user';
import { Classes } from '../core/models/classes';
import { AddClasses } from '../core/models/classes-add'
import { UserClasses } from '../core/models/user-classes';
import { AddUserClass } from '../core/models/add-user-clas';


@Injectable({
  providedIn: 'root'
})
export class SharedService {
readonly APIUrl = "http://127.0.0.1:8000/gymapp"


  constructor(private http: HttpClient) { }

  getClassroomsList():Observable<Classroom> {
    return this.http.get<PaginatedList<Classroom>>(this.APIUrl + '/classrooms')
    .pipe(map((data: PaginatedList<Classroom>)=> data.results))
  }

  getOneClassroom(id: number):Observable<Classroom> {
    return this.http.get<Classroom>(this.APIUrl + '/classrooms/' + id);
  }

  addClassroom(val: Classroom) {
    return this.http.post(this.APIUrl + '/classrooms', val);
  }

  updateClassroom(val: Classroom) {
    const body = {id: val.id, name: val.name, url: val.url}
    return this.http.put(this.APIUrl + '/classrooms/' + val.id , body);
  }

  deleteClassroom(val: number) {
    return this.http.delete(this.APIUrl + '/classrooms/' + val);
  }

  getClassCategoryList():Observable<ClassesCategory> {
    return this.http.get<PaginatedList<ClassesCategory>>(this.APIUrl + '/classescategory')
    .pipe(map((data: PaginatedList<ClassesCategory>)=> data.results))
  }

  getOneClassCategory(id: number):Observable<ClassesCategory> {
    return this.http.get<ClassesCategory>(this.APIUrl + '/classescategory/' + id);
  }

  addClassCategory(val: ClassesCategory) {
    return this.http.post(this.APIUrl + '/classescategory', val);
  }

  updateClassCategory(val: ClassesCategory) {
    const body = {id: val.id, name: val.name, description: val.description}
    return this.http.put(this.APIUrl + '/classescategory/' + val.id , body);
  }

  deleteClassCategory(val: number) {
    return this.http.delete(this.APIUrl + '/classescategory/' + val);
  }

  getUsersList():Observable<User> {
    return this.http.get<PaginatedList<User>>(this.APIUrl + '/basicusers')
    .pipe(map((data: PaginatedList<User>)=> data.results))
  }

  getTrainersList():Observable<User> {
    return this.http.get<PaginatedList<User>>(this.APIUrl + '/basicusers')
    .pipe(map((data: PaginatedList<User>)=> data.results),
    filter((data) => data.id <= 0 )) //wtf it does'nt work
  }

  getOneUser(id: number):Observable<User> {
    return this.http.get<User>(this.APIUrl + '/basicusers/' + id);
  }

  addUser(val: User) {
    return this.http.post(this.APIUrl + '/register', val);
  }

  deleteUser(val: number) {
    return this.http.delete(this.APIUrl + '/basicusers/' + val);
  }

  getClassesList(): Observable<Classes> {
    return this.http.get<PaginatedList<Classes>>(this.APIUrl + '/classes')
    .pipe(map((data: PaginatedList<Classes>)=> data.results))
  }

  addClass(val: Classes) {
    return this.http.post(this.APIUrl + '/classes', val);
  }

  deleteClass(val: number) {
    return this.http.delete(this.APIUrl + '/classes/' + val);
  }

  getUserClassesList(): Observable<UserClasses> {
    return this.http.get<PaginatedList<UserClasses>>(this.APIUrl + '/userclasses')
    .pipe(map((data: PaginatedList<UserClasses>)=> data.results))
  }

  addUserClass(val: AddUserClass) {
    return this.http.post(this.APIUrl + '/userclasses', val);
  }

  deleteUserClass(val: number) {
    return this.http.delete(this.APIUrl + '/userclasses/' + val);
  }

  postLoggedinUser(val: any){
    return this.http.post('http://127.0.0.1:8000/gymapp/login', val, {
      withCredentials: true
    })
  }

  getLoggedinUser(){
    return this.http.get('http://127.0.0.1:8000/gymapp/user', {withCredentials: true})
  }

  getUserClassesForGivenUser(id: number){
    return this.http.get<PaginatedList<UserClasses>>(this.APIUrl + '/users/' + id + '/userclasses')
    .pipe(map((data: PaginatedList<UserClasses>)=> data.results))
  }

}
