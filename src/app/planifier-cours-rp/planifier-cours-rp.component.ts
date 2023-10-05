import { Component, OnInit } from '@angular/core';
import { CoursService } from '../services/cours.service';
import { Classes, Dta, Module, Profs, Root, Semestre } from '../models/Root';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

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
  ngOnInit() {
    this.getAllNeed();
  }

  constructor(private courseService: CoursService, private fb: FormBuilder) {
  }

  getAllNeed() {
    return this.courseService.getAllNeed().subscribe(
      (data) => {
        this.semestres = data.data.semestres
        this.modules = data.data.modules
        this.professeurs = data.data.professeurs
        this.classes = data.data.classes
      }
    )
  }

  planForm: FormGroup = this.fb.group({
    module_id: [''],
    professeur_id: [''],
    semestre_id: [''],
    nbr_heures: [''],
    classe_ids: ['']
  });

  get classe_id() {
    return this.planForm.controls["classe_ids"] as FormArray;
  }

  add() {
    return this.courseService.add("cours", this.planForm.value).subscribe(
      val => {
        console.log(val);
      }
    )

  }

  selectClasse(e: any) {
    console.log(e);
    this.planForm.get('classe_ids')?.patchValue(e);
  }

}
