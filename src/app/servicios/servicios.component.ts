import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { error } from 'node:console';
import { resolve } from 'node:path';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.component.html',
  styleUrl: './servicios.component.css'
})
export class ServiciosComponent {

  constructor(private http: HttpClient) { }


  /* public postNoToken(url:string,body:any):Promise<any>{
    return this.http.post(url,body).toPromise().then(res => res as any[])
    .then(res => {
      return res;
    });
  } */

  public postNoToken(url: string, body: any): Observable<any> {
    return this.http.post(url, body);
  }

  public postNoToken2(body: any, url: string): Promise<any> {
    const data = JSON.stringify(body);
    //const URL = this.customUrl == null ? this.urlEnv + url : this.customUrl + url;
    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
    return this.http.post(url, data, { headers })
      .toPromise()
      .then(res => res as any[])
      .then(res => {
        return res;
      });
  }

  consultaJson() {
    const promise: Promise<any> = new Promise((resolve: any, reject: any) => {
      this.http.get('assets/json/verbos.json').subscribe(
        (resp: any) => {
          resolve(resp)
        },
        (error: any) => {
          if (error.status === 404) {
            resolve(null)
          }
          else {
            reject("Archivo no encontrado")
          }
        }
      )
    })
    return promise;
  }


}
