import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.component.html',
  styleUrl: './servicios.component.css'
})
export class ServiciosComponent {

  constructor(private http:HttpClient){}


public postNoToken(url:string,body:any):Promise<any>{
  return this.http.post(url,body).toPromise().then(res => res as any[])
  .then(res => {
    return res;
  });
}



}