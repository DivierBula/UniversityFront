import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AsociarprogramaService } from './asociarprograma.service';
import { AsociarPrograma } from '../models/AsociarPrograma.model';
import { Programs } from '../models/Programs.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-asociarprograma',
  templateUrl: './asociarprograma.component.html',
  styleUrls: ['./asociarprograma.component.scss']
})
export class AsociarprogramaComponent {
  public checkoutForm : FormGroup;

  constructor(public formBuilder: FormBuilder, public service: AsociarprogramaService) {
    this.checkoutForm = this.formBuilder.group({
      IdEstudiante: '',
      asignatura: ''
    });
  }

  ngOnInit() {
    this.service.Termino$.subscribe((result: string) => {
        if(result != '' && result=='OK')
        {
          this.msgGenericSuccess('Asignación','La materia fue asignada correctamente');
          this.service.getProgramas(); 
          this.service.resetTermino();
        }else if(result != ''){
          this.msgGenericError('Asignación', result);
          this.service.resetTermino();
        }
    });
  }

  OnSubmit() { 
    const _student: AsociarPrograma = {
      IdEstudiante: this.checkoutForm.controls['IdEstudiante'].value,
      IdProgram:  Number(this.checkoutForm.controls['asignatura'].value)
    }
    this.service.AsociarPrograma(_student);
    this.checkoutForm.get('IdEstudiante')?.setValue("");
    this.checkoutForm.get('IdProgram')?.setValue("");
  }

  private msgGenericSuccess(title:string, msg: string)
  {
    Swal.fire({
      title: title,
      text: msg,
      icon: 'success',
      confirmButtonText: 'Ok',
      confirmButtonColor: '#375a7f',
      allowOutsideClick: false
    });
  }
  private msgGenericError(title:string, msg: string)
  {
    Swal.fire({
      title: title,
      text: msg,
      icon: 'error',
      confirmButtonText: 'Ok',
      confirmButtonColor: '#375a7f',
      allowOutsideClick: false
    });
  }
}
