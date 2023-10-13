import { Component, OnInit } from '@angular/core';
import { User } from '../models/Root';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  constructor(private router: Router) {

  }
  user!: User;
  role!: string | string[];
  ngOnInit() {
    if (localStorage.getItem('user')) {
      let ue = localStorage.getItem('user');
      this.user = JSON.parse(ue!);
      this.role = this.user.role;
      console.log(this.role);
    }
  }
  truePro: boolean = this.role == 'prof';
 
  
  loggout() {

    Swal.fire({
      title: 'Are you sure?',
      text: "Voulez vous vraiment se déconnecter!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui!! !',
      cancelButtonText: 'Non, annuler!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem('user')
        localStorage.removeItem('tkn')
        this.router.navigate(['/login'])
        Swal.fire(
          'déconnecté!',
          'Déconnecté',
          'success'
        )
      }
    })


  }
}
