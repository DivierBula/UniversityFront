import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfesorComponent } from './profesor/profesor.component';
import { EstudianteComponent } from './estudiante/estudiante.component';
import { ProgramaComponent } from './programa/programa.component';
import { AsociarprogramaComponent } from './Asociarprograma/asociarprograma.component';
import { HomeComponent } from './home/home.component';
import { ProgramacionComponent } from './programacion/programacion.component';

const routes: Routes = [
  { path: '', redirectTo: 'Home', pathMatch: 'full' },
  { path: 'Home', component: HomeComponent },
  { path: 'Profesor', component: ProfesorComponent },
  { path: 'Estudiante', component: EstudianteComponent },
  { path: 'Materia', component: ProgramaComponent },
  { path: 'Programacion', component: ProgramacionComponent },
  { path: 'Asociarprograma', component: AsociarprogramaComponent },
  { path: '**', redirectTo: 'Home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
