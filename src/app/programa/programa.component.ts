import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EstudianteService } from '../estudiante/estudiante.service';
import { ProgramaService } from './programa.service';

@Component({
  selector: 'app-programa',
  templateUrl: './programa.component.html',
  styleUrls: ['./programa.component.scss']
})
export class ProgramaComponent {
  public checkoutForm : FormGroup;
  isVisible: boolean = false;

  constructor(public formBuilder: FormBuilder, public service: ProgramaService) {
    this.checkoutForm = this.formBuilder.group({
      codigo: ''
    });
  }

  BuscarProgramas()
  {debugger
    this.isVisible =  false;
    this.service.allUsers = [];
    this.service.getHistoryStudents(this.checkoutForm.get('codigo')?.value);
    setTimeout(() => {
      console.log(this.service.allUsers)
    }, 3000);
  }
  OpenDetalle(user: any)
  {
    this.service.allStudents = undefined;
    this.isVisible =  true;
    this.service.getStudentsXProgram(user.idPrograma);
    console.log(user);
  }
}
