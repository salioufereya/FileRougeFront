import { Component, OnInit } from '@angular/core';
import { Cours, Dta, Module, Profs, Root, Session } from '../models/Root';
import { AttachService } from './services/attach.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-attach',
  templateUrl: './attach.component.html',
  styleUrls: ['./attach.component.css']
})
export class AttachComponent implements OnInit {
  sessions!: Session[];
  selectedValue: string = 'Filtrer par prof'
  selected: string = "Filtrer par module"
  constructor(private attachService: AttachService) { }
  ngOnInit() {
    this.all();
    this.getAllNeed();
  }
  page: number = 1;
  count: number = 0;
  tableSize: number = 7;
  cours: Cours[] = [];
  modules: Module[] = [];
  professeurs: Profs[] = []

  all() {
    return this.attachService.all<Root<Session[]>>("sessions").subscribe(
      data => {
        this.sessions = data.data;
        console.log(this.sessions);
      }
    )
  }
  pagination(event: any) {
    this.page = event;
    this.all();
  }

  valide(e: Session) {
    Swal.fire({
      title: 'Are you sure?',
      text: "Voulez vous vraiment valider cette session!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui!! !',
      cancelButtonText: 'Non, annuler!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.attachService.add<Root<Dta>>("sessions/valider", { id: e.id }).subscribe(data => {
          console.log(data);
          if (data.code == 200) {
            Swal.fire(
              'Deleted!',
              'Session valider avec success.',
              'success'
            )
          }
        })
      }
    })
  }


  getAllNeed() {
    return this.attachService.getAllNeed().subscribe(
      (data) => {
        this.modules = data.data.modules
        this.professeurs = data.data.professeurs
        this.cours = data.data.cours
      }
    )
  }
}
