import { Injectable } from '@angular/core';
import { RestService } from '../services/rest.service';
import { ConstantsService } from '../models/constants/constants-service';
import { Programs } from '../models/Programs.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EstudianteService {
  public allUsers: Programs | any;
  private _termino = new BehaviorSubject<string[]>([]);
  get Termino$() { return this._termino.asObservable(); }

  constructor(private rest: RestService, private consts: ConstantsService) {
    this.authenticate();
  }

  public authenticate(): void {
    this.rest.authenticate$().subscribe((data)=>
    {
      localStorage.setItem(this.consts.TOKEN_AUTH, data.result.token);
      this.getStudents();
    });
  }

  public getStudents(): void {
    this.rest.getStudents$().subscribe((students) => {
      this.allUsers = [];
      if(students.result!=null)
        this.allUsers = students.result;
    },
      (error:any) => {
        if (error.status == 401 || error.status == 0)
          this.authenticate();
        else
          console.error(error);
      });
  }

  public getStudent(id:number): void { 
    this.rest.getStudent$(id).subscribe((students) => {
      this.allUsers = [];
      if(students.result!=null)
        this.allUsers = [students.result];
    },
      (error:any) => {
        if (error.status == 401 || error.status == 0)
          this.authenticate();
        else
          console.error(error);
      });
  }

  public createStudent(student: any): void {
    this.rest.createStudent$(student).subscribe((_data) => {
      if(_data.result == 'OK')
        {
          this._termino.next(['Creación','El estudiante fue creado correctamente','OK']);
        }
        else{
          this._termino.next(['Creación',_data.result,'ERROR']);
        }
    },
      (error:any) => {
        if (error.status == 401 || error.status == 0)
          this.authenticate();
        else
          console.error(error);
          this._termino.next(['Creación',"Se presento un error en el sistema: "+error,'ERROR']);
      });
  }

  public updateStudent(student: any): void {
    this.rest.updateStudent$(student).subscribe((_data) => {
      if(_data.result == 'OK')
        {
          this._termino.next(['Actualización','El estudiante fue actualizado correctamente','OK']);
        }
        else{
          this._termino.next(['Actualización',_data.result,'ERROR']);
        }
    },
      (error:any) => {
        if (error.status == 401 || error.status == 0)
          this.authenticate();
        else
          console.error(error);
          this._termino.next(['Actualización',"Se presento un error en el sistema: "+error,'ERROR']);
      });
  }

  public deleteStudent(id:number): void {
    this.rest.deleteStudent$(id).subscribe((_data) => {
      if(_data.result == 'OK')
        {
          this._termino.next(['Eliminación','El estudiante fue eliminado correctamente','OK']);
        }
        else{
          this._termino.next(['Eliminación',_data.result,'ERROR']);
        }
    },
      (error:any) => {
        if (error.status == 401 || error.status == 0)
          this.authenticate();
        else
          console.error(error);
          this._termino.next(['Eliminación',"Se presento un error en el sistema: "+error,'ERROR']);
      });
  }

  resetTermino() {
    this._termino.next([]);
  }
  
}
