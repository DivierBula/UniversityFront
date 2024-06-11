import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProfesorService } from './profesor.service';
import { Teachers } from '../models/Teachers.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profesor',
  templateUrl: './profesor.component.html',
  styleUrls: ['./profesor.component.scss']
})
export class ProfesorComponent {

  public checkoutForm : FormGroup;
  isVisible = false;
  isCreacion:string= '';
  buscarIdentificacion:number | undefined;
  buttonText:string = 'Crear Profesor';
  tituloText:string = 'Crear Profesor';
  _teachers: Teachers = new Teachers();

  constructor(public formBuilder: FormBuilder, public service: ProfesorService) {
    this.checkoutForm = this.formBuilder.group({
      nombre: '',
      telefono: ''
    });
  }

  ngOnInit() {
    this.service.Termino$.subscribe((result: string) => {
        if(result != '' && result=='OK')
        {
          this.msgGenericSuccess('Creación','El profesor fue creado correctamente');
          this.service.getTeachers();
          this.service.resetTermino();
        }else if(result != ''){
          this.msgGenericError('Creación', result);
          this.service.resetTermino();
        }
    });
  }

  OnSubmit() {
    this._teachers = {
      nombre: this.checkoutForm.controls['nombre'].value,
      telefono:  this.checkoutForm.controls['telefono'].value
    }
    this.service.createTeacher(this._teachers);
    this.checkoutForm.get('nombre')?.setValue("");
    this.checkoutForm.get('telefono')?.setValue("");
  }

  OpenForm(texto: string, value: boolean){
    this.clearValues();
    this.isVisible = value;
    this.buttonText = this.isVisible ? 'Cancelar' : 'Crear Profesor';
    this.tituloText = `${texto} Profesor`;
    this.isCreacion = texto;
  }


  private clearValues(): void {
    this.buttonText = 'Crear Profesor';
    const _Form = this.checkoutForm;
    Object.keys(_Form.controls).forEach(campo=>{
      const setCampo = _Form.get(campo);
      if (setCampo) {
        setCampo.setValue('');
      }
    });
  }

  BuscarId()
  { 
    if(this.buscarIdentificacion)
      this.service.getTeacher(this.buscarIdentificacion);
    else
      this.service.getTeachers();
  }

  updateValues(campo: string, valor:string): void {
    const _Form = this.checkoutForm;
    const setCampo = _Form.get(campo);
    if (setCampo) {
      setCampo.setValue(valor);
    }
  }

  OpenUpdateUser(user: any)
  {
    this.OpenForm('Actualizar', true);
    Object.keys(user).forEach(key => {
      const valor = user[key];
      this.updateValues(key,valor);
    });
    this._teachers.idProfesor = user.idProfesor;
  }
  UpdateUser()
  {
    this._teachers.nombre = this.checkoutForm.controls['nombre'].value;
    this._teachers.telefono = this.checkoutForm.controls['telefono'].value;
    
    this.msgGenericSuccess('Actualizacion','El usuario a sido actualizado correctamente')
  }


  OpenDeleteUser(user: any)
  {
    Swal.fire({
      title: '¿Eliminar estudiante?',
      text: '¿Estás seguro de que deseas eliminar el registro?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, Eliminar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#375a7f',
      cancelButtonColor: '#444',
      allowOutsideClick: false
    }).then((result) => {
      if (result.isConfirmed) {
        this.DeleteUser(user.idEstudiante);
      }
    });
  }

  private DeleteUser(id: any)
  {
    this.msgGenericSuccess('Eliminación','El profesor a sido eliminado correctamente')
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
    }).then((result) => {
      this.service.getTeachers();
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
