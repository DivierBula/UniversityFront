import { Injectable } from '@angular/core';
import { RestService } from '../services/rest.service';
import { ConstantsService } from '../models/constants/constants-service';
import { Student } from '../models/Students.model';
import { Programs } from '../models/Programs.model';

@Injectable({
  providedIn: 'root'
})
export class ProgramaService {
  public loader: boolean = false;
  public allUsers: Programs | any;
  public allStudents: Student | any;
  constructor(private rest: RestService, private consts: ConstantsService) {
    this.authenticate();
  }

  private authenticate(): void {
    this.rest.authenticate$().subscribe((data)=>
    {
      localStorage.setItem(this.consts.TOKEN_AUTH, data.result.token);
    });
  }

  public getHistoryStudents(idStudent: number): void {
    this.loader = true;
    this.rest.getHistoryStudents$(idStudent).subscribe((_programs) => {
      this.loader = false;
      this.allUsers = _programs.result;
    },
      (error:any) => {
          console.error(error);
      });
  }

  public getStudentsXProgram(idProgram: number): void {
    this.loader = true;
    this.rest.getStudentsXProgram$(idProgram).subscribe((_Student) => {
      this.loader = false;
      this.allStudents = _Student.result;
    },
      (error:any) => {
          console.error(error);
      });
  }
}
