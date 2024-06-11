import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProgramacionService } from './programacion.service';

@Component({
  selector: 'app-programacion',
  templateUrl: './programacion.component.html',
  styleUrls: ['./programacion.component.scss']
})
export class ProgramacionComponent {
  nombreMateria: string = '';

  constructor(public formBuilder: FormBuilder, public service: ProgramacionService) {
  }

  BuscarMateria()
  {debugger
    if(this.nombreMateria)
      this.service.getProgramas(this.nombreMateria);
    else
      this.service.getProgramas();
  }
}
