import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { initFlowbite } from 'flowbite';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'FileRougeFront';
  ngOnInit(): void {
    initFlowbite();
  }
  constructor(private router: ActivatedRoute, public roter: Router) {
  }

  alertWithSuccess() {
    Swal.fire("Ajoutée avec succès", "success");
  }

   
  
}

