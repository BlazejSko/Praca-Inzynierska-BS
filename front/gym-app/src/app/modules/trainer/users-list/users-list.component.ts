import { Component, OnInit } from '@angular/core';

import { User } from 'src/app/core/models/user';
import { SharedService } from '../../../shared/shared.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css'],
})
export class UsersListComponent implements OnInit {
  constructor(private http: SharedService) {}
  usersList: any = [];
  trainerList: any = [];
  displayedColumns: string[] = [
    'id',
    'username',
    'first_name',
    'last_name',
    'email',
    'is_staff',
    'options',
  ];
  ngOnInit(): void {
    this.refreshUsersList();
    this.getTrainersList();
  }

  refreshUsersList() {
    this.http.getUsersList().subscribe((data) => {
      this.usersList = data;
    });
  }

  getTrainersList() {
    this.http
      .getTrainersList()
      .pipe()
      .subscribe((data) => {
        this.trainerList = data;
      });
  }

  deleteUser(item: number) {
    if (confirm('Are you sure you want to delete that user?')) {
      this.http.deleteUser(item).subscribe(() => {
        this.refreshUsersList();
      });
    }
  }
}
