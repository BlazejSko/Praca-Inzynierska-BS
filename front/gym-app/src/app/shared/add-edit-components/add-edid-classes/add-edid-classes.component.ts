import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { User } from 'src/app/core/models/user';
import { SharedService } from '../../shared.service';

@Component({
  selector: 'app-add-edid-classes',
  templateUrl: './add-edid-classes.component.html',
  styleUrls: ['./add-edid-classes.component.css'],
})
export class AddEdidClassesComponent implements OnInit {
  form!: FormGroup;
  loggedUser!: User;
  class_categories!: any;
  classrooms!: any;

  constructor(private formBulider: FormBuilder, private http: SharedService) {}

  ngOnInit(): void {
    this.form = this.formBulider.group({
      start_date: '',
      end_date: '',
      max_capacity: 0,
      current_capacity: 0,
      classroom: 'Big hall',
      trainer: '',
      class_category: 'Tabata',
    });
    this.getData();
  }

  submit() {
    console.log(this.form.getRawValue());
    this.http.addClass(this.form.getRawValue()).subscribe(() => {
      alert('Added succesfull');
    });
  }
  getData() {
    this.http.getLoggedinUser().subscribe(
      (res: any) => {
        this.loggedUser = res;
      },
      (err) => {
        console.log(err);
      }
    );

    this.http.getClassCategoryList().subscribe((data) => {
      this.class_categories = data;
    });

    this.http.getClassroomsList().subscribe((data) => {
      this.classrooms = data;
      console.log(this.classrooms);
    });
  }
}
