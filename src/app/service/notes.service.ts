import {Injectable} from '@angular/core';
import {Note, NoteControllerService} from "../openapi";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class NotesService {


  private noteSource: BehaviorSubject<Note[]> = new BehaviorSubject<Note[]>([]);
  currentNotes = this.noteSource.asObservable();

  constructor(private noteControllerService: NoteControllerService) {
  }

  changeNotes(notes: Array<Note>) {
    this.noteSource.next(notes);
  }

  public getAllNotes(): void {
    this.noteControllerService.getNotes()
      .subscribe({
        next: response => this.changeNotes(response),
        error: err => console.log(err)
      })
  }


}

