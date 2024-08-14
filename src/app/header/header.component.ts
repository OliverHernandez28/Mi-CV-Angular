import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {


  menuCel=false

  menuCelFuction(){
    this.menuCel=!this.menuCel;
  }

}
