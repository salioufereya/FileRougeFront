import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { Data, Router } from '@angular/router';
import { Login, Root } from '../models/Root';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  ngOnInit() { };

  loginForm!: FormGroup
  constructor(private loginService: LoginService, private fb: FormBuilder, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(2)]],
    });
  }
  login() {
    console.log("heho");
    return this.loginService.login<Login>(this.loginForm.value).subscribe(
      (x: Login) => {
        if (x.code === 200) {
          this.router.navigate(['/appNav']);
          console.log(x.data.user);
          //  localStorage.setItem('tkn', x.data.user);
          // this.router.navigate(['/accueil'])
          localStorage.setItem('usr', JSON.stringify(x.data.user));

        }
        else {
          console.log(x);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'email ou mot de passe invalide',
          })
        }
      }
    )
  }
  isActive: boolean = true;
  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }
}
