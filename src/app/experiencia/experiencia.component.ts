import { Component } from '@angular/core';

@Component({
  selector: 'app-experiencia',
  templateUrl: './experiencia.component.html',
  styleUrl: './experiencia.component.css'
})
export class ExperienciaComponent {
x=1


anterior(){
  this.x>1?this.x--:this.x=4
}

siguiente(){
  this.x<4?this.x++:this.x=1
}
}
