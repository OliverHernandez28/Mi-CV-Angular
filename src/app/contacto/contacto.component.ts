import { Component, ViewChild } from '@angular/core';
// @ts-ignore
import Swal from '../../../public/js/sweetalert2.all.min.js';
import { ServiciosComponent } from '../servicios/servicios.component';
import { NgForm } from '@angular/forms';

interface Correo {
  name: string;
  email: string;
  comments: string;
}

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrl: './contacto.component.css',
})
export class ContactoComponent {
  constructor(private peticiones: ServiciosComponent) { }
  @ViewChild('form') form!: NgForm;

  correo: Correo = {
    name: '',
    email: '',
    comments: '',
  };
  enviarCorreco(event: any) {
    if (event.valid) {
      Swal.fire({
        title: '¡Procesando Petición!',
        /* text: '¡Por favor espere!', */
        html: '<h4>¡Por favor espere!</h4> <small>Esto puede tardar unos segundos.</small>',
        icon: 'info',
        allowOutsideClick: false,
      });
      Swal.showLoading();

      const body = new FormData();
      body.append('Nombre', this.correo.name);
      body.append('Correo', this.correo.email);
      body.append('Comentarios', this.correo.comments);

      this.peticiones
        .postNoToken(
          'https://formsubmit.co/ajax/oliverhernandez206@gmail.com',
          body
        )
        .subscribe(

          {
            next: (resp) => {
              console.log(resp);
              console.log(resp.success);
              console.log(typeof resp.success);
              if (resp.success == 'true') {
                Swal.close();
                this.correo.name = '';
                this.correo.email = '';
                this.correo.comments = '';
                Swal.fire({
                  title: '¡Éxito!',
                  text: 'Tu mensaje ha sido enviado.',
                  html: '   <svg fill="#ff6f61" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">            <path d="M12,18c4,0,5-4,5-4H7C7,14,8,18,12,18z" />            <path d="M12,2C6.486,2,2,6.486,2,12c0,5.514,4.486,10,10,10s10-4.486,10-10C22,6.486,17.514,2,12,2z M12,20c-4.411,0-8-3.589-8-8 s3.589-8,8-8s8,3.589,8,8S16.411,20,12,20z" />            <path d="M13 12l2 .012C15.012 11.55 15.194 11 16 11s.988.55 1 1h2c0-1.206-.799-3-3-3S13 10.794 13 12zM8 11c.806 0 .988.55 1 1h2c0-1.206-.799-3-3-3s-3 1.794-3 3l2 .012C7.012 11.55 7.194 11 8 11z" /></svg><h3>¡Muchas Gracias! Por tus comentarios.</h3>',
                  icon: 'success',
                });
                this.form.reset();
              } else {
                Swal.fire({
                  title: '¡Ocurrio un error!',
                  text: 'Tuvimos un incoveniente guardando la informacion por favor intenta mas tarde.',
                  icon: 'warning',
                });
              }
            },
            error: (e) => {
              Swal.close();
              Swal.fire({
                title: 'Error',
                text: 'Hubo un problema al enviar tu mensaje. Inténtalo de nuevo.',
                icon: 'error',
              })
            }
          }
        )

    } else {
      Swal.fire({
        title: 'Verifica tu información',
        text: 'Detectamos que tienes información errónea o no tienes información en algún campo.',
        icon: 'info',
        allowOutsideClick: false,
      });
    }
  }
}
