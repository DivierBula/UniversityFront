import { Injectable } from '@angular/core';
import { RestService } from '../services/rest.service';
import { ConstantsService } from '../models/constants/constants-service';
import { Student } from '../models/Students.model';
import { Programs } from '../models/Programs.model';

@Injectable({
  providedIn: 'root'
})
export class ProgramacionService {
  public loader: boolean = false;
  public allProgramas: Programs | any;
  public allStudents: Student[] | undefined;
  constructor(private rest: RestService, private consts: ConstantsService) {
    this.authenticate();
  }

  private authenticate(): void {
    this.rest.authenticate$().subscribe((data)=>
    {
      localStorage.setItem(this.consts.TOKEN_AUTH, data.result.token);
      this.getProgramas();
    });
  }

  public getProgramas(nombreMateria:string = ''): void {
    this.rest.getProgramas$().subscribe((_programs) => {
      if(_programs.result!=null && _programs.result.length > 0)
      { 
        this.allStudents = [];
        if(nombreMateria!=''){
        const estudiantesConMatematicas = _programs.result.filter((estudiante:any) => estudiante.nombre.toLowerCase().includes(nombreMateria.toLowerCase()));
        estudiantesConMatematicas.forEach((element: Programs) => {
          this.getStudentsXProgram(element);
        });
      }else{
        _programs.result.forEach((element: Programs) => {
          this.getStudentsXProgram(element);
        });
      }
      }
    },
      (error:any) => {
        if (error.status == 401 || error.status == 0)
          this.authenticate();
        else
          console.error(error);
      });
  }

  public getStudentsXProgram(programa: Programs): void {
    this.loader = true;
    this.rest.getStudentsXProgram$(Number(programa.idPrograma)).subscribe((_Student) => {
      this.loader = false;
      if(_Student.result!=null)
      {
        _Student.result.forEach((x: Student)=> {
          x.program = programa;
          if(this.allStudents)
            this.allStudents.push(x);
        });
      }
      console.log(this.allStudents);
    },
      (error:any) => {
          console.error(error);
      });
  }
}
