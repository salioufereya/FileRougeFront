import { Component, OnInit } from '@angular/core';

import { Classes, Cours, Module, Profs, Root, Semestre } from '../../app/models/Root';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { initFlowbite } from 'flowbite';
import { CoursService } from 'src/app/services/cours.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { DataSharedService } from '../services/data-shared.service';

@Component({
  selector: 'app-planifier-cours-rp',
  templateUrl: './planifier-cours-rp.component.html',
  styleUrls: ['./planifier-cours-rp.component.css']
})
export class PlanifierCoursRpComponent implements OnInit {

  modules!: Module[];
  semestres!: Semestre[]
  professeurs!: Profs[];
  classes!: Classes[];
  cours!: Cours[]
  ngOnInit() {
    this.getAllNeed();
    initFlowbite();
  }
  page: number = 1;
  count: number = 0;
  tableSize: number = 5;

  constructor(private courseService: CoursService, private fb: FormBuilder, private toastr: ToastrService, private router: Router, private sharedService: DataSharedService) {
  }
  AddSession(e: any) {
    this.sharedService.updateData(e);
    const objetJSON = JSON.stringify(e);
    localStorage.setItem("monObjet", objetJSON);
    this.router.navigate(['/calendrier']);
  }

  showSuccess() {
    this.toastr.success('Cours planifié avec success!');
  }

  getAllNeed() {
    return this.courseService.getAllNeed().subscribe(
      (data) => {
        this.semestres = data.data.semestres
        this.modules = data.data.modules
        this.professeurs = data.data.professeurs
        this.cours = data.data.cours
        this.classes = data.data.classes
      }
    )
  }

  planForm: FormGroup = this.fb.group({
    module_id: ['', [Validators.required]],
    professeur_id: ['', [Validators.required]],
    semestre_id: ['', [Validators.required]],
    nbr_heures: ['', [Validators.required, Validators.min(10)]],
    classe_ids: [[], [Validators.required]],
    etat: ['EnAttente'],
  });

  add() {
    return this.courseService.add<Root<Cours>>("cours", this.planForm.value).subscribe(
      val => {
        console.log(val);
        if (val.code == 200) {
          this.cours.unshift(val.data);
          this.showSuccess();
          this.planForm.reset();

        }
      }
    )
  }

  selectClasse(e: any) {
    console.log(e);
    this.planForm.get('classe_ids')?.patchValue(e);
  }

  filtre!: string
  pagination(event: any) {
    this.page = event;
    this.getAllNeed();
  }
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.getAllNeed();
  }
}
