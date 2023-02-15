import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-directiva',
  templateUrl: './directiva.component.html',
  styleUrls: ['./directiva.component.css']
})
export class DirectivaComponent {

  listaCurso: string[] = ['type script', 'javascript', 'java', 'php', 'c#'];

  habilitar :boolean = true;

  constructor() { }

  mostrar() {
    this.habilitar = !this.habilitar
  }

}
