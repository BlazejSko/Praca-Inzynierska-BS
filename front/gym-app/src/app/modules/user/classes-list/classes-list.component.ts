import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Emitters } from 'src/app/core/emitters/emitters';
import { Classes } from 'src/app/core/models/classes';
import { AddClasses } from 'src/app/core/models/classes-add';
import { User } from 'src/app/core/models/user';
import { AddEdidClassesComponent } from 'src/app/shared/add-edit-components/add-edid-classes/add-edid-classes.component';
import { SharedService } from '../../../shared/shared.service';

@Component({
  selector: 'app-classes-list',
  templateUrl: './classes-list.component.html',
  styleUrls: ['./classes-list.component.css'],
})
export class ClassesListComponent implements OnInit {
  constructor(private http: SharedService, private dialog: MatDialog) {}
  loggedUser: User = {
    id: -1,
    username: '',
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    last_login: '',
    is_superuser: false,
    is_staff: false,
    is_active: false,
    date_joined: '',
  };
  classesList!: any;
  selectedClass!: Classes;
  addClasses!: AddClasses;
  loggedUserClasseSId!: any;
  loggedUserClasseSIddd: any = [];

  displayedColumns: string[] = [
    'id',
    'trainer',
    'classroom',
    'start_date',
    'class_category',
    'capacity',
    'options',
  ];
  ngOnInit(): void {
    this.refreshClassesList();
    this.selectedClass = {
      id: -1,
      trainer: 'trainer',
      classroom: 'Big hall',
      start_date: '2022-01-07T14:46:00Z',
      end_date: '2022-01-07T14:46:00Z',
      max_capacity: -1,
      current_capacity: 0,
      class_category: 'Tabata',
      participants: [],
    };
    this.refreshLoggedUser();
    setTimeout(() => {
      this.http
        .getIdForUserClassesForGivenUser(this.loggedUser.id)
        .subscribe((data) => {
          this.loggedUserClasseSId = data;
          this.add();
        });
    }, 100);
  }

  refreshClassesList() {
    this.http.getClassesList().subscribe((data: any) => {
      this.classesList = data;
    });
  }

  refreshLoggedUser() {
    this.http.getLoggedinUser().subscribe(
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
  addClass() {
    this.http.addClass(this.selectedClass).subscribe((data) => {
      this.classesList.push(data);
      this.refreshClassesList();
    });
  }

  deleteClass(id: number) {
    if (confirm('Are you sure you want to delete it?')) {
      this.http.deleteClass(id).subscribe((data) => {
        this.refreshClassesList();
        alert('Deleted successful!');
      });
    }
  }

  register(class_id: number) {
    this.http
      .addUserClass({
        class_id: class_id,
        user: this.loggedUser.id,
      })
      .subscribe(
        () => {
          alert('Registered successful!');
          this.refreshClassesList();
        },
        (err) => {
          alert('You have already registered for this training');
          console.log('error', err);
        }
      );
  }

  onCreate() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    this.dialog.open(AddEdidClassesComponent);
  }

  showRegisterButton(class_id: number, current: number, max: number): boolean {
    if (this.loggedUserClasseSIddd.indexOf(class_id) === -1 && current < max && !this.loggedUser.is_staff) {
      return true;
    } else return false; // UWAGA TROCHE MULI
    // return current >= max ? false : true;
  }

  add() {
    for (let x of this.loggedUserClasseSId) {
      this.loggedUserClasseSIddd.push(x.class_id.id);
    }
  }
}
