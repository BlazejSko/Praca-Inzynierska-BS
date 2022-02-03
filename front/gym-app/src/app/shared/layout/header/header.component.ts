import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Emitters } from 'src/app/core/emitters/emitters';
import { User } from 'src/app/core/models/user';
import { SharedService } from '../../shared.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  authenticated = false;
  loggedUser!: User;
  constructor(
    private http: HttpClient,
    private sharedService: SharedService,
    private router: Router
  ) {
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
      date_joined: '',
    };
  }
  ngOnInit(): void {
    Emitters.authEmitter.subscribe((auth: boolean) => {
      this.authenticated = auth;
    });
    this.refreshLoggedUser();
  }

  navigateToUserClasses() {
    this.refreshLoggedUser();
    setTimeout(() => {
      this.router.navigate(['/userclasses/' + this.loggedUser.id]);
    }, 100);
  }

  navigateToClassesList() {
    this.refreshLoggedUser();
    setTimeout(() => {
      this.router.navigate(['/trainings/' + this.loggedUser.id]);
    }, 100);
  }

  refreshLoggedUser() {
    this.sharedService.getLoggedinUser().subscribe(
      (res: any) => {
        this.loggedUser = res;
        Emitters.authEmitter.emit(true);
      },
      (err) => {
        console.log(err);
        Emitters.authEmitter.emit(false);
      }
    );
  }

  logout(): void {
    this.http
      .post(
        'http://127.0.0.1:8000/gymapp/logout',
        {},
        { withCredentials: true }
      )
      .subscribe(() => {
        this.authenticated = false;
        alert('Logout successful!');
      });
    Emitters.authEmitter.emit(false);
  }
}
