import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.css'
})
export class NotFoundComponent {
constructor(private route: Router){}
  volver(){


    setTimeout(()=>{
      this.route.navigate(['/home'])},3000)
  }
}
