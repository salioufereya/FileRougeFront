import { Component, OnInit } from '@angular/core';
import { CalendarEvent, CalendarView } from 'angular-calendar';
import { TemplateRef } from '@angular/core';

import { CoursService } from '../services/cours.service';
import { Cours } from '../models/Root';
@Component({
  selector: 'app-calendrier',
  templateUrl: './calendrier.component.html',
  styleUrls: ['./calendrier.component.css']
})

export class CalendrierComponent implements OnInit {
  ngOnInit(): void {
    this.AllNeed()
  }
  cours!: Cours[]
  viewDate: Date = new Date();
  view: CalendarView = CalendarView.Week
  CalendarView = CalendarView
  events: CalendarEvent[] = []
  constructor(private courseService: CoursService) {
    const event1 = {
      title: "Cours de tennis",
      start: new Date("2023-10-09T08:00:00"),
      end: new Date("2023-10-09T12:00:00"),
    }
    this.events.push(event1);
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  AllNeed() {
    return this.courseService.getAllNeed().subscribe(
      (data) => {
        this.cours = data.data.cours
      }
    )
  }
}
