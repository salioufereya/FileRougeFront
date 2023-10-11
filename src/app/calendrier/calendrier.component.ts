import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CalendarEvent, CalendarView } from 'angular-calendar';
import { TemplateRef } from '@angular/core';

import { CoursService } from '../services/cours.service';
import { Classes, Cours, Dta, Module, Root, Salles, Semestre, Session } from '../models/Root';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataSharedService } from '../services/data-shared.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-calendrier',
  templateUrl: './calendrier.component.html',
  styleUrls: ['./calendrier.component.css']
})


export class CalendrierComponent implements OnInit {
  daa: any = { "id": 1, "name": "diallo" };
  classes!: any
  monObjet: any
  selectedButton: string = 'month';
  ngOnInit(): void {
    this.AllNeed()
    const objetJSON = localStorage.getItem("monObjet");
    this.monObjet = JSON.parse(objetJSON!);
    console.log(this.monObjet);
    this.formCalendar.get('professeur')?.setValue(this.monObjet.professeur)
    this.formCalendar.get('cours_id')?.setValue(this.monObjet.id)
    this.classes = this.monObjet.classes
    this.all();
    this.affectClandar();

  }
  tab: any = [];
  salles!: Salles[]
  formCalendar!: FormGroup
  modules!: Module[];
  semestres!: Semestre[]
  coures!: any;
  cours!: Cours[]
  viewDate: Date = new Date();
  view: CalendarView = CalendarView.Week
  CalendarView = CalendarView
  events: CalendarEvent[] = []
  enLigne: boolean = false;

  constructor(private courseService: CoursService, private fb: FormBuilder, private sharedService: DataSharedService, private toastr: ToastrService) {
    // this.formCalendar.get('professeur')!.setValue(this.tab[0].professeur)

    const event1 = {
      title: "Cours de tennis",
      start: new Date("2023-10-09T08:00:00"),
      end: new Date("2023-10-09T12:00:00"),
    }
    this.events.push(event1);

    // 




    this.formCalendar = this.fb.group({
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

  }

  salle!: Salles[]

  check(event: Event) {
    let even = event.target as HTMLInputElement
    this.enLigne = even.checked
  }

  sessions!: Session[];

  selectA(event: Event) {
    let even = event.target as HTMLInputElement;
    this.salle = this.salles.filter((e: any) => e.id === +even.value);
    console.log(this.salle[0]?.id);
    if (this.salle[0]?.nbr_places < this.effectif) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Cette salle ne peut pas contenir cet effectif',
      })
      even.value = "";
    }
    this.dataAny = {
      salle_id: this.formCalendar.get('salle_id')!.value,
      heure_debut: this.formCalendar.get('heure_debut')?.value,
      heure_fin: this.formCalendar.get('heure_fin')?.value,
      date: this.formCalendar.get('date')?.value
    }
    return this.courseService.add<Root<Dta>>("sessions/searchProf", this.dataAny).subscribe(
      data => {
        console.log(data)
        if (data.code === 500) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'La salle n\'est pas disponible à cette heure!',
          })
          this.formCalendar.get('salle_id')?.reset();
        }
      })
  }
  all() {
    return this.courseService.all<Root<Session[]>>("sessions").subscribe(
      data => {
        this.sessions = data.data;
        console.log(this.sessions);
        const events = this.sessions.map((item) => {
          const startDateTime = new Date(`${item.date}T${item.heure_debut}`);
          const endDateTime = new Date(`${item.date}T${item.heure_fin}`);
          return {
            title: item.cours,
            start: startDateTime,
            end: endDateTime
          };
        });
        console.log(events);
        this.events.push(...events);
      })
  }


  affectClandar() {



  }

  select(e: Event) {
    let event = e.target as HTMLInputElement
    this.coures = this.cours.filter((e: any) => e.id == +event.value)
    this.classes = this.coures[0].classes;
    this.formCalendar.get('professeur')?.setValue(this.coures[0].professeur)
  }

  effectif: number = 0;
  selectClasse(e: any) {
    this.effectif = 0;
    console.log(e);
    e.forEach((el: any) => {
      this.effectif += el.effectif;
    });
    console.log(this.classes);
    this.formCalendar.get('classe_ids')?.setValue(e)
  }

  setView(view: CalendarView) {
    this.view = view;
    if (view === CalendarView.Month) {
      this.selectedButton = 'month';
    } else if (view === CalendarView.Week) {
      this.selectedButton = 'week';
    } else if (view === CalendarView.Day) {
      this.selectedButton = 'day';
    }
  }
  selectedDateNavButton: string = 'today';
  onDateNavButtonClick(buttonId: string) {
    this.selectedDateNavButton = buttonId;
    if (buttonId === 'previous') {
    } else if (buttonId === 'today') {
    } else if (buttonId === 'next') {
    }
  }
  AllNeed() {
    return this.courseService.getAllNeed().subscribe(
      (data) => {
        this.cours = data.data.cours
        this.salles = data.data.salles
      }
    )
  }
  add() {

    return this.courseService.add<Root<Session>>("sessions", this.formCalendar.value).subscribe(data => {
      if (data.code === 200) {
        Swal.fire({
          icon: 'success',
          title: 'success...',
          text: 'Session ajouté avec succees!',
        })
        const event1 = {
          title: data.data.cours,
          start: new Date(`${data.data.date}T${data.data.heure_debut}`),
          end: new Date(`${data.data.date}T${data.data.heure_fin}`),
        };
        console.log(event1);
        this.events.push(event1);
      }
    })
  }

  dataAny!: any
  search() {
    this.dataAny = {
      professeur: this.formCalendar.get('professeur')!.value,
      heure_debut: this.formCalendar.get('heure_debut')?.value,
      heure_fin: this.formCalendar.get('heure_fin')?.value,
      date: this.formCalendar.get('date')?.value
    }
    return this.courseService.add<Root<Dta>>("sessions/search", this.dataAny).subscribe(
      data => {
        console.log(data)
        if (data.code === 500) {
          this.toastr.error(data.message)
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Le prof n\'est pas disponible à cette heure!',
          })
          this.formCalendar.get('heure_debut')?.reset();
          this.formCalendar.get('heure_fin')?.reset();
        }
      })
  }

  searchProf() {

  }





}
