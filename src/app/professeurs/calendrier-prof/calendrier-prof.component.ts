import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CalendarEvent, CalendarView } from 'angular-calendar';
import { th } from 'date-fns/locale';
import { Cours, Dta, Module, Root, Semestre } from 'src/app/models/Root';
import { ProfesseurService } from '../services/professeur.service';

@Component({
  selector: 'app-calendrier-prof',
  templateUrl: './calendrier-prof.component.html',
  styleUrls: ['./calendrier-prof.component.css']
})
export class CalendrierProfComponent {

  add() {
    throw new Error('Method not implemented.');
  }

  constructor(private fb: FormBuilder, private profService: ProfesseurService) {

  }
  expression: boolean = false;
  selectedButton: string = 'month';

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


  id!: number;
  titre: string = 'zerty';
  date: string = ''
  heure_debut!: string
  heure_fin!: string


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
  onEventClicked(event: any): void {
    this.expression = true;
    this.titre = event.event.title
    this.date = event.event.date
    this.heure_debut = event.event.heure_debut
    this.heure_fin = event.event.heure_fin
    this.annulForm.get('id')?.setValue(event.event.id)
    // console.log('Événement cliqué:', event.event.id);

  }
  annulation: boolean = false;
  close() {
    this.expression = false;
  }

  annul() {
    this.annulation = true;
  }

  valideForm() {
    return this.profService.add<Root<Dta>>("sessions/terminer", { id: this.annulForm.value.id }).subscribe(data => {
      console.log(data);
      if (data.code == 200) {
      }
    })
  }



  annulForm: FormGroup = this.fb.group({
    id: ['', [Validators.required]],
    motif: ['', Validators.required],
  });


  demande() {
    return this.profService.add<Root<Dta>>("professeurs/session/demandeAnnulation", this.annulForm.value).subscribe(data => {
      console.log(data);
      if (data.code == 200) {
        this.annulForm.value.reset();
      }
    })
  }
}
