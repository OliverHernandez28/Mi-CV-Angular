import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AcercaComponent } from './acerca/acerca.component';
import { ServiciosComponent } from './servicios/servicios.component';
import { PortafolioComponent } from './portafolio/portafolio.component';
import { ExperienciaComponent } from './experiencia/experiencia.component';
import { ContactoComponent } from './contacto/contacto.component';

const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'acerca',component:AcercaComponent},
  {path:'servicios',component:ServiciosComponent},
  {path:'portafolio',component:PortafolioComponent},
  {path:'experiencia',component:ExperienciaComponent},
  {path:'contacto',component:ContactoComponent},
  {path:'**',component:NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
