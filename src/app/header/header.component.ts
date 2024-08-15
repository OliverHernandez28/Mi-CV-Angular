import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {

constructor(private router:Router){}
  menuCel=false
  actual=''

ngOnInit(): void {
  this.router.events.subscribe(event => {
    if(event instanceof NavigationEnd){
      this.actual=this.router.url
    }
  })
}

  menuCelFuction(){
    this.menuCel=!this.menuCel;
  }

}
