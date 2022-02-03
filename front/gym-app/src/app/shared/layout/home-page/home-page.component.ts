import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Emitters } from 'src/app/core/emitters/emitters';
import { User } from 'src/app/core/models/user';
import { SharedService } from '../../shared.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  message = "";
  loggedUser!: User;
  userClassesList!: any;
  constructor(private http: SharedService) { 
    this.loggedUser = { 
      id: -1,
      username: '',
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      last_login: '',
      is_superuser: false,
      is_staff: false,
      is_active: true,
      date_joined: ''}
  }

  ngOnInit(): void {
    this.http.getLoggedinUser().subscribe(
      (res: any) => {
        this.message = `Hi ${res.username}!`;
        this.loggedUser = res;
        Emitters.authEmitter.emit(true);
      },
      err => {
        console.log(err);
        this.message = "You are not logged in";
        Emitters.authEmitter.emit(false);
      }
    );
    this.refreshUserClassesList();
  }

  refreshUserClassesList(){
    this.http.getUserClassesForGivenUser(1).subscribe((data: any)=> {
      this.userClassesList = data;
    });
  }
}
