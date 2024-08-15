import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AcercaComponent } from './acerca/acerca.component';
import { ServiciosComponent } from './servicios/servicios.component';
import { PortafolioComponent } from './portafolio/portafolio.component';
import { ExperienciaComponent } from './experiencia/experiencia.component';
import { ContactoComponent } from './contacto/contacto.component';
import { ExtraComponent } from './extra/extra.component';

export const routes: Routes = [
  {path:'home',component:HomeComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {path:'acerca',component:AcercaComponent},
  {path:'servicios',component:ServiciosComponent},
  {path:'portafolio',component:PortafolioComponent},
  {path:'experiencia',component:ExperienciaComponent},
  {path:'contacto',component:ContactoComponent},
  {path:'extra',component:ExtraComponent},
  {path:'**',component:NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
