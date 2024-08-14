import { Component, ViewChild } from '@angular/core';

import { ModalComponent } from '../modal/modal.component';
@Component({
  selector: 'app-portafolio',
  templateUrl: './portafolio.component.html',
  styleUrl: './portafolio.component.css'
})
export class PortafolioComponent {
  
  @ViewChild('trabajo1') private trabajo1!: ModalComponent;
  @ViewChild('trabajo2') private trabajo2!: ModalComponent;
  @ViewChild('trabajo3') private trabajo3!: ModalComponent;
  @ViewChild('trabajo4') private trabajo4!: ModalComponent;
  @ViewChild('trabajo5') private trabajo5!: ModalComponent;
  @ViewChild('trabajo6') private trabajo6!: ModalComponent;
modal(param:any){  
if(param==1)
  this.trabajo1.openlg({ size: 'lg', animation: true });
if(param==2)
  this.trabajo2.openlg({ size: 'lg', animation: true });
if(param==3)
  this.trabajo3.openlg({ size: 'lg', animation: true });
if(param==4)
  this.trabajo4.openlg({ size: 'lg', animation: true });
if(param==5)
  this.trabajo5.openlg({ size: 'lg', animation: true });
if(param==6)
  this.trabajo6.openlg({ size: 'lg', animation: true });
}
}
