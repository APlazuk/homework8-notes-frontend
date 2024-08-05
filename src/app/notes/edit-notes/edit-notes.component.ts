import {Component, Input, OnInit, TemplateRef} from '@angular/core';
import {Note, NoteControllerService} from "../../openapi";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {NgIf} from "@angular/common";
import {NotesService} from "../../service/notes.service";

@Component({
  selector: 'app-edit-notes',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './edit-notes.component.html',
  styleUrl: './edit-notes.component.css'
})
export class EditNotesComponent implements OnInit {
  @Input() noteEdit!: Note;

  editForm: FormGroup = new FormGroup({
    title: new FormControl('', Validators.required),
    content: new FormControl('', Validators.required),
    author: new FormControl('', Validators.required),
  })

  modalService: NgbModal = new NgbModal();

  constructor(private noteControllerService: NoteControllerService, private noteService: NotesService) {
  }

  get editFormControl() {
    return this.editForm.controls;
  }

  ngOnInit(): void {
  }

  editNote() {
    console.log("Note editNote: ", this.noteEdit);
    let note = Object.assign(this.editForm.value) as Note;
    note.id = this.noteEdit.id;
    console.log(note);

    this.noteControllerService.editNote(note).subscribe((result) => {
      this.ngOnInit();
    })

    this.editForm.reset();
    this.modalService.dismissAll();
  }

  openEdit(contentEditNote: TemplateRef<Note>) {
    console.log("Note id: ", this.noteEdit.id);
    this.modalService.open(contentEditNote, {
      centered: true,
      backdrop: 'static',
      size: 'lg',
    });

    console.log("Note: ", this.noteEdit);

    this.editForm.patchValue({
      id: this.noteEdit.id,
      title: this.noteEdit.title,
      content: this.noteEdit.content,
      author: this.noteEdit.author
    });

    document.getElementById('save-btn')!.addEventListener('click', (e) => {
      this.noteService.getAllNotes();
    });
  }
}
