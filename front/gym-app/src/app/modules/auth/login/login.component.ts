import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { SharedService } from '../../../shared/shared.service';

export interface Help {
  jwt: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  form!: FormGroup;
  constructor(
    private formBulider: FormBuilder,
    private router: Router,
    private http: SharedService
  ) { }

  ngOnInit(): void {
    this.form = this.formBulider.group({
      username: '',
      password: ''
    });
  }

  submit(){
    this.http.postLoggedinUser(this.form.getRawValue()).subscribe(()=> this.router.navigate(['']));
  }
  toRegister(){
    this.router.navigate(['register']);
  }

}
