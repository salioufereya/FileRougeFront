import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { Data, Router } from '@angular/router';
import { Root } from '../models/Root';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  ngOnInit() { };
  constructor(private loginService: LoginService, private fb: FormBuilder, private router: Router) {
  }
  login() {
    this.router.navigate(['/appNav']);
    console.log("heho");

    return this.loginService.login<Root<Data>>(this.loginForm.value).subscribe(
      (x: Root<Data>) => {
        if (x.code === 200) {
          console.log(x);
        }
        else {
          console.log(x);
        }
      }
    )
  }

  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(2)]],
  });
  isActive: boolean = true;
  get email() { return this.loginForm.get('email'); }

  get password() { return this.loginForm.get('password'); }




}
