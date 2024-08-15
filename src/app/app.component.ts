import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { routes } from './app-routing.module';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'mi-cv-angular';
  constructor(private router :Router) {}
mostrar=true
  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        let ruta=this.router.url.replace('/','')

routes.some(num => num.path==ruta)?this.mostrar=true:this.mostrar=false



      }
    });
  }


}
