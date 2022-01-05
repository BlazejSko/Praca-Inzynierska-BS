import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { PaginatedList } from '../core/models/paginated-list-type';
import { Classroom } from '../core/models/classroom';
import { ClassesCategory } from '../core/models/classes-category-payload';


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
}
