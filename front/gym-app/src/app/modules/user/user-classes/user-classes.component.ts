import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { SharedService } from '../../../shared/shared.service';

@Component({
  selector: 'app-user-classes',
  templateUrl: './user-classes.component.html',
  styleUrls: ['./user-classes.component.css'],
})
export class UserClassesComponent implements OnInit {
  userClassesList!: any;
  userId = -1;
  displayedColumns = [
    'trainer',
    'classroom',
    'start_date',
    'class_category',
    'options',
  ];
  constructor(private http: SharedService, private route: ActivatedRoute) {
    this.route.params.subscribe((params: Params) => {
      this.userId = params['id'];
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.userId = params['userId'];
      this.refreshUserClassesList();
    });
  }

  refreshUserClassesList() {
    this.http.getUserClassesForGivenUser(this.userId).subscribe((data: any) => {
      this.userClassesList = data;
    });
  }

  show() {
    console.log(this.userClassesList);
  }

  deleteUserClass(id: number) {
    if (confirm('Are you sure you want to quit this training?')) {
      this.http.deleteUserClass(id).subscribe(() => {
        this.refreshUserClassesList();
      });
    }
  }
}
