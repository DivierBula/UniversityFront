import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProfesorComponent } from './profesor/profesor.component';
import { EstudianteComponent } from './estudiante/estudiante.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProgramaComponent } from './programa/programa.component';
import { AsociarprogramaComponent } from './Asociarprograma/asociarprograma.component';
import { HomeComponent } from './src/app/home/home.component';
import { ProgramacionComponent } from './programacion/programacion.component';

@NgModule({
  declarations: [
    AppComponent,
    ProfesorComponent,
    EstudianteComponent,
    ProgramaComponent,
    AsociarprogramaComponent,
    HomeComponent,
    ProgramacionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
