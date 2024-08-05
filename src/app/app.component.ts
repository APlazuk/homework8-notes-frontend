import {Component, OnInit} from '@angular/core';
import {RouterModule, RouterOutlet} from '@angular/router';
import {NotesComponent} from "./notes/notes.component";
import {EditNotesComponent} from "./notes/edit-notes/edit-notes.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AddNotesComponent} from "./notes/add-notes/add-notes.component";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NotesComponent, RouterModule, EditNotesComponent, ReactiveFormsModule, AddNotesComponent, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'My Notes';
}
