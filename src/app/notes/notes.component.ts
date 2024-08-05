import {Component, OnInit} from '@angular/core';
import {Note} from "../openapi";
import {NotesService} from "../service/notes.service";
import {NgForOf} from "@angular/common";
import {EditNotesComponent} from "./edit-notes/edit-notes.component";

@Component({
  selector: 'app-notes',
  standalone: true,
  imports: [
    NgForOf,
    EditNotesComponent
  ],
  templateUrl: './notes.component.html',
  styleUrl: './notes.component.css'
})
export class NotesComponent implements OnInit {

  notes: Array<Note> = [];


  constructor(private noteService: NotesService) {
  }

  ngOnInit(): void {
    this.noteService.getAllNotes();
    this.updateNotes();
  }

  private updateNotes() {
    this.noteService.currentNotes
      .subscribe(notes => {
        this.notes = notes;
      })
    console.log(this.notes);
  }
}
