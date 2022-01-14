import { Component, OnInit } from '@angular/core';
import { AddUserClass } from 'src/app/core/models/add-user-clas';
import { UserClasses } from 'src/app/core/models/user-classes';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-user-classes',
  templateUrl: './user-classes.component.html',
  styleUrls: ['./user-classes.component.css']
})
export class UserClassesComponent implements OnInit {

  constructor(private http: SharedService) { }
  userClassesList!: any;
  adUserClass!: AddUserClass;


  ngOnInit(): void {
    this.refreshUserClassesList();
    this.adUserClass = { class_id: 3, user: 1 };
  }

  refreshUserClassesList(){
    this.http.getUserClassesList().subscribe((data: any)=> {
      this.userClassesList = data;
    });
  }
  show(){
    console.log(this.userClassesList)
  }

  addUserClass(){
    this.http.addUserClass(this.adUserClass).subscribe(
      data => {
        this.userClassesList.push(data);
      });
  }

  deleteUserClass(id: number) {
    this.http.deleteUserClass(id).subscribe(
      data=> {
        this.refreshUserClassesList()
      }
    )
  }

}
