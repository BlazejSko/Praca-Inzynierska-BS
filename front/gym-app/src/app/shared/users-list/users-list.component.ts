import { Component, OnInit } from '@angular/core';

import { User } from 'src/app/core/models/user';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  constructor(private http: SharedService) { 
    this.selectedUser = { 
      id: -1,
      username: 'testowfyname',
      first_name: 'tescik',
      last_name: 'lasciktescik',
      email: 'email@email.pl',
      password: 'haslo',
      last_login: '2021-11-16 10:45:13.000000',
      is_superuser: false,
      is_staff: false,
      is_active: true,
      date_joined: '2021-11-16 10:45:13.000000'}
  }
  usersList: any = [];
  trainerList: any = [];
  selectedUser!: User;
  ngOnInit(): void {
    this.refreshUsersList();
    this.getTrainersList();
  }

  refreshUsersList(){
    this.http.getUsersList().subscribe(data=> {
      this.usersList = data;
    });
  }

  getTrainersList(){
    this.http.getTrainersList().subscribe(data=> {
      this.trainerList = data;
    });
  }

  onUserClick(user: User){
    console.log(user);
    console.log(this.usersList)
    console.log(this.trainerList)
  }

  addUser(){
    this.http.addUser(this.selectedUser).subscribe(
      data => {
        this.usersList.push(data);
      }
    )
  }
  deleteUser(item: number){
    this.http.deleteUser(item).subscribe((data) => {
      this.refreshUsersList();
    });
  }


}
