import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { SharedService } from '../../shared.service';

@Component({
  selector: 'app-add-edid-class-category',
  templateUrl: './add-edid-class-category.component.html',
  styleUrls: ['./add-edid-class-category.component.css'],
})
export class AddEdidClassCategoryComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private formBulider: FormBuilder,
    private http: SharedService,
  ) {}

  ngOnInit(): void {
    this.form = this.formBulider.group({
      name: '',
      description: '',
    });
  }

  submit() {
    this.http.addClassCategory(this.form.getRawValue()).subscribe(() => {
      alert('Added succesfull');
    });
  }
}
