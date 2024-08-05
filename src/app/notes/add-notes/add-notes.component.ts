import {Component, OnInit, TemplateRef} from '@angular/core';
import {NgIf} from "@angular/common";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Note, NoteControllerService} from "../../openapi";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {NotesService} from "../../service/notes.service";

@Component({
  selector: 'app-add-notes',
  standalone: true,
  imports: [
    NgIf,
    ReactiveFormsModule
  ],
  templateUrl: './add-notes.component.html',
  styleUrl: './add-notes.component.css'
})
export class AddNotesComponent implements OnInit {

  private note: Note = {author: "", creationDate: "", title: ""};
  noteForm: FormGroup = new FormGroup({
    title: new FormControl('', Validators.required),
    content: new FormControl('', Validators.required),
    author: new FormControl('', Validators.required),
  })

  constructor(private noteControllerService: NoteControllerService,
              private noteService: NotesService) {
  }

  ngOnInit(): void {
  }

  get addFormControl() {
    return this.noteForm.controls;
  }

  modalService: NgbModal = new NgbModal();

  createNote(): Note {
    console.log(this.noteForm.value);
    this.note = Object.assign(this.noteForm.value);
    return this.note;
  }

  addNote(): void {
    let note = this.createNote();
    console.log("Note to save: " + note);
    this.noteControllerService.saveNote(note)
      .subscribe((result) => {
        this.ngOnInit();
      });
    this.noteForm.reset();
    this.modalService.dismissAll();
  }

  openAdd(contentAddNote: TemplateRef<Note>) {
    this.modalService.open(contentAddNote, {
      centered: true,
      backdrop: 'static',
      size: 'lg',
    });


    document.getElementById('save-btn')!.addEventListener('click', (e) => {
      this.noteService.getAllNotes();
    });
  }
}
