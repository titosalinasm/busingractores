import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './components/inicio/inicio.component';

const routes: Routes = [
  { path: '', redirectTo: '/inicio', pathMatch: 'full' },
  // { path: '', redirectTo: '/persona', pathMatch: 'full' },
  {
    path: 'inicio', component: InicioComponent
  },
  // { path: 'registro', component: RegistroComponent },
  // { path: 'mas-informacion', component: MasInformacionComponent },
  // { path: 'terminos-y-condiciones', component: TerminosComponent },
  // { path: 'preguntas-frecuentes', component: PreguntasfrecuentesComponent },
  // { path: 'clases-niza', component: ClasesnizaComponent },

  // { path: 'persona', component: DatosPersonalesComponent }
];




@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
