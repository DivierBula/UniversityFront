import { Injectable } from '@angular/core';
import { RestService } from '../services/rest.service';
import { ConstantsService } from '../models/constants/constants-service';
import { Teachers } from '../models/Teachers.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfesorService {

  public allUsers: Teachers | any;
  private _termino = new BehaviorSubject<string>('');
  get Termino$() { return this._termino.asObservable(); }
  
  constructor(private rest: RestService, private consts: ConstantsService) {
    this.authenticate();
  }

  private authenticate(): void {
    this.rest.authenticate$().subscribe((data)=>
    {
      localStorage.setItem(this.consts.TOKEN_AUTH, data.result.token);
      this.getTeachers();
    });
  }

  public getTeachers(): void {
    this.rest.getTeachers$().subscribe((_teacher) => {
      this.allUsers = [];
      if(_teacher.result!=null)
        this.allUsers = _teacher.result;
    },
      (error:any) => {
        if (error.status == 401 || error.status == 0)
          this.authenticate();
        else
          console.error(error);
      });
  }

  public getTeacher(id:number): void {
    this.rest.getTeacher$(id).subscribe((_teacher) => {
      this.allUsers = [];
      if(_teacher.result!=null)
        this.allUsers = [_teacher.result];
    },
      (error:any) => {
        if (error.status == 401 || error.status == 0)
          this.authenticate();
        else
          console.error(error);
      });
  }

  public createTeacher(student: any): void {
    this.rest.createTeacher$(student).subscribe((_data) => {
      this._termino.next(_data.result);
    },
      (error:any) => {
        if (error.status == 401 || error.status == 0)
          this.authenticate();
        else
          console.error(error);
          this._termino.next(error);
      });
  }

  resetTermino() {
    this._termino.next('');
  }

}
