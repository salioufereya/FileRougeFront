import { Component, OnInit } from '@angular/core';
import { SessionService } from '../services/session.service';
import { Cours, Dta, Root, Salles, Session } from '../models/Root';
import { CoursService } from '../services/cours.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-planifier-session-rp',
  templateUrl: './planifier-session-rp.component.html',
  styleUrls: ['./planifier-session-rp.component.css']
})
export class PlanifierSessionRpComponent implements OnInit {
  sessions!: Session[];
  cours!: Cours[]
  salles!: Salles[]
  enLigne: boolean = false;
  ngOnInit() {
    this.all();
    this.AllNeed();
  }
  constructor(private sessionService: SessionService, private courseService: CoursService, private fb: FormBuilder, private toastr: ToastrService) {
  }
  coures!: any
  formSession: FormGroup = this.fb.group({
    cours_id: ['', [Validators.required]],
    professeur: ['', [Validators.required]],
    date: ['', [Validators.required]],
    heure_debut: ['', [Validators.required]],
    heure_fin: ['', [Validators.required]],
    salle_id: ['', [Validators.required]],
    nbr_heures: [''],
    classe_ids: [[], [Validators.required]],
    etat: ['enAttente'],
  });

  // Créez un getter pour chaque contrôle de formulaire
  get cours_id() {
    return this.formSession.get('cours_id');
  }

  get professeur() {
    return this.formSession.get('professeur');
  }

  get date() {
    return this.formSession.get('date');
  }

  get heure_debut() {
    return this.formSession.get('heure_debut');
  }

  get heure_fin() {
    return this.formSession.get('heure_fin');
  }

  get salle_id() {
    return this.formSession.get('salle_id');
  }

  get nbr_heures() {
    return this.formSession.get('nbr_heures');
  }

  get classe_ids() {
    return this.formSession.get('classe_ids');
  }

  get presentiel() {
    return this.formSession.get('presentiel');
  }

  get etat() {
    return this.formSession.get('etat');
  }

  sesion!: Session

  add() {
    console.log(this.formSession.value);
    this.sesion = {
      cours: this.date?.value,
      heure_debut: this.heure_debut?.value,
      heure_fin: this.heure_fin?.value,
      etat: this.etat?.value,
      salle: this.salle_id?.value,
      professeur: this.professeur?.value,
      date: this.date?.value,
      classes: this.classe_ids?.value
    }
    return this.sessionService.add<Root<Dta>>("sessions", this.formSession.value).subscribe(data => {
      console.log(data);
      if (data.code === 200) {
        this.sessions.unshift(this.sesion);
      }
    })
  }
  all() {
    return this.sessionService.all<Root<Session[]>>("sessions").subscribe(
      data => {
        this.sessions = data.data;
      }
    )
  }
  AllNeed() {
    return this.courseService.getAllNeed().subscribe(
      (data) => {
        this.cours = data.data.cours
        this.salles = data.data.salles
      }
    )
  }
  check(event: Event) {
    let even = event.target as HTMLInputElement
    this.enLigne = even.checked
  }

  classes: any
  effectif: number = 0;

  selectClasse(e: any) {
    this.effectif = 0;
    console.log(e);
    e.forEach((el: any) => {
      this.effectif += el.effectif;
    });
    console.log(this.classes);
    this.formSession.get('classe_ids')?.setValue(e)

  }

  select(e: Event) {
    let event = e.target as HTMLInputElement
    this.coures = this.cours.filter((e: any) => e.id == +event.value)
    this.classes = this.coures[0].classes;
    this.formSession.get('professeur')?.setValue(this.coures[0].professeur)
  }

  dataAny!: any
  salle!: Salles[]
  search() {
    this.dataAny = {
      professeur: this.professeur!.value,
      heure_debut: this.formSession.get('heure_debut')?.value,
      heure_fin: this.formSession.get('heure_fin')?.value,
      date: this.formSession.get('date')?.value
    }
    return this.courseService.add<Root<Dta>>("sessions/search", this.dataAny).subscribe(
      data => {
        console.log(data)
        if (data.code === 500) {
          this.toastr.error(data.message)
        }
      })
  }
  selectA(event: Event) {
    let even = event.target as HTMLInputElement;
    this.salle = this.salles.filter((e: any) => e.id === +even.value);
    console.log(this.salle[0]?.id);
    if (this.salle[0]?.nbr_places < this.effectif) {
      this.toastr.error("Cette salle ne peut pas contenir cet effectif", '', { timeOut: 10000 });
      even.value = "";
    }
  }

  verifyContent() {
  }


}

