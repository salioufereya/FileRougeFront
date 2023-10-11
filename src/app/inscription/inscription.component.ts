import { Component } from '@angular/core';
import * as XLSX from 'xlsx'
import { InscriptionService } from '../services/inscription.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Dta, Root } from '../models/Root';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent {
  constructor(private inscriptionService: InscriptionService, private fb: FormBuilder) {

  }
  students: any
  readExcel(event: any) {
    let file = event.target?.files[0]
    let fileReader = new FileReader();
    fileReader.readAsBinaryString(file);
    fileReader.onload = (e) => {
      var workbook = XLSX.read(fileReader.result, { type: "binary" });
      var sheetNames = workbook.SheetNames;
      this.students = XLSX.utils.sheet_to_json(workbook.Sheets[sheetNames[0]], { raw: false });
      console.log(this.students);
    }

  }
  inscriptionForm: FormGroup = this.fb.group({});
  add() {
    return this.inscriptionService.add<Root<Dta>>("inscriptions", { object: this.students }).subscribe(data => {
      console.log(data);
      if (data.code == 200) {
        Swal.fire({
          icon: 'success',
          title: 'Oops...',
          text: 'Eleves inscris avec success',
        })
        this.students.splice(0, this.students.length);
      }
      else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Une erreur s\'est produite',
        })
      }
    })
  }




}
