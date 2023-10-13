import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';
import Swal from 'sweetalert2';
//import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root'
})
export class hasRoleGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): boolean {
    const isAuthorazed = this.authService.getUser() == next.data['role']

    if (!isAuthorazed) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Vous n\'etes pas authorizé a consulter cette age',
      })
    }
    return isAuthorazed;
  }
}

;
