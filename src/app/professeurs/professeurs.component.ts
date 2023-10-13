import { Component, OnInit, ViewChild } from '@angular/core';
import { ProfesseurService } from './services/professeur.service';
import { Cours, Dta, Root, Session, User } from '../models/Root';
import { CalendrierComponent } from '../calendrier/calendrier.component';
import { CalendrierProfComponent } from './calendrier-prof/calendrier-prof.component';

@Component({
  selector: 'app-professeurs',
  templateUrl: './professeurs.component.html',
  styleUrls: ['./professeurs.component.css']
})
export class ProfesseursComponent implements OnInit {

  constructor(private professeurService: ProfesseurService) {
  }
  @ViewChild(CalendrierProfComponent) child!: CalendrierProfComponent;
  next: string = 'professeurs/cours'
  next2: string = 'professeurs/sessions'
  cours!: Cours[];
  sessions!: Session[];
  user!: User
  ngOnInit() {
    if (localStorage.getItem('user')) {
      let ue = localStorage.getItem('user');
      this.user = JSON.parse(ue!);

    }
    this.courss();
    this.sessionss();
  };
  courss() {
    return this.professeurService.search<Root<any>>({ email: this.user.email }, this.next).subscribe(
      data => {
        this.cours = data.data
      }
    )
  }
  sessionss() {
    return this.professeurService.search<Root<any>>({ email: this.user.email }, this.next2).subscribe(
      data => {
        this.sessions = data.data
        console.log(this.sessions);
        const events = this.sessions.map((item) => {
          const startDateTime = new Date(`${item.date}T${item.heure_debut}`);
          const endDateTime = new Date(`${item.date}T${item.heure_fin}`);
          const id = item.id;
          return {
            id: id,
            title: item.cours,
            date: item.date,
            heure_debut: item.heure_debut,
            heure_fin: item.heure_fin,
            start: startDateTime,
            end: endDateTime
          };
        });
        console.log(events);
        this.child.events.push(...events);
      })
  }
}

