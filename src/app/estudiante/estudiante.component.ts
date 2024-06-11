import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { EstudianteService } from './estudiante.service';
import { Student } from '../models/Students.model';
import Swal from 'sweetalert2';
import { registerLocaleData } from '@angular/common';

@Component({
  selector: 'app-estudiante',
  templateUrl: './estudiante.component.html',
  styleUrls: ['./estudiante.component.scss']
})
export class EstudianteComponent {
  title = 'StudingAcademiProyect';
  public checkoutForm : FormGroup;
  isVisible = false;
  isCreacion:string= '';
  buscarIdentificacion:number | undefined;
  buttonText:string = 'Crear Estudiante';
  tituloText:string = 'Crear Estudiante';
  _student: Student = new Student();

  constructor(public formBuilder: FormBuilder, public service: EstudianteService) {
    this.checkoutForm = this.formBuilder.group({
      nombre: '',
      telefono: ''
    });
  }

  ngOnInit() {
    this.service.Termino$.subscribe((result: string[]) => {
        if(result.length > 0 && result[2] == 'OK')
        {
          this.msgGenericSuccess(result[0],result[1]);
          this.service.getStudents();
          this.service.resetTermino();
        }else if(result.length > 0 && result[2] == 'ERROR'){
          this.msgGenericError(result[0], result[1]);
          this.service.resetTermino();
        }
    });
  }

  OnSubmit() {
    this._student = {
      nombre: this.checkoutForm.controls['nombre'].value,
      telefono:  this.checkoutForm.controls['telefono'].value
    }

    this.service.createStudent(this._student);
    this.isVisible = false;
    this.clearValues();
  }

  OpenForm(texto: string, value: boolean){
    this.clearValues();
    this.isVisible = value;
    this.buttonText = this.isVisible ? 'Cancelar' : 'Crear Estudiante';
    this.tituloText = `${texto} Estudiante`;
    this.isCreacion = texto;
  }


  private clearValues(): void {
    this.buttonText = 'Crear Estudiante';
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
      this.service.getStudent(this.buscarIdentificacion);
    else
      this.service.getStudents();
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
    this._student.idEstudiante = user.idEstudiante;
  }
  UpdateUser()
  {
    this._student.nombre = this.checkoutForm.controls['nombre'].value;
    this._student.telefono = this.checkoutForm.controls['telefono'].value;
    this.service.updateStudent(this._student);
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
    this.service.deleteStudent(id);
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
      this.service.getStudents();
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


