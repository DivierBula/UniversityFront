import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, retry, throwError } from 'rxjs';
import { Auth } from '../models/auth.model';
import { ConstantsService } from '../models/constants/constants-service';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(private httpClient: HttpClient, private consts: ConstantsService) { }

  private httpOptionAuth(){
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8',
        'Data-Type': 'json'
      })
    }
  }

  private httpOption(){
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8',
        'Data-Type': 'json',
        'Authorization': "Bearer " + localStorage.getItem(this.consts.TOKEN_AUTH)
      })
    }
  }

  public authenticate$(): Observable<any> {
    return this.httpClient.post(this.consts.BASE_URL + this.consts.AUTH, this.consts.USER, this.httpOptionAuth())
    .pipe(
      retry(3),
      catchError(error=> { console.log('###Error' + error); return throwError(error)})
    );
  }

  public getHistoryStudents$(idStudent: number): Observable<any> {
    return this.httpClient.get(this.consts.BASE_URL + this.consts.GET_PROGRAMSxSTUDENT + idStudent, this.httpOption())
    .pipe(
      retry(1),
      catchError(error=> { console.log('###Error' + error); return throwError(error)})
    );
  }

  public getStudentsXProgram$(idProgram: number): Observable<any> {
    return this.httpClient.get(this.consts.BASE_URL + this.consts.GET_STUDENTxPROGRAMS + idProgram, this.httpOption())
    .pipe(
      retry(1),
      catchError(error=> { console.log('###Error' + error); return throwError(error)})
    );
  }

  public getStudents$(): Observable<any> {
    return this.httpClient.get(this.consts.BASE_URL + this.consts.GET_STUDENT, this.httpOption())
    .pipe(
      retry(1),
      catchError(error=> { console.log('###Error' + error); return throwError(error)})
    );
  }

  public getStudent$(id:number): Observable<any> {
    return this.httpClient.get(this.consts.BASE_URL + this.consts.GET_STUDENT + `/${id}`, this.httpOption())
    .pipe(
      retry(1),
      catchError(error=> { console.log('###Error' + error); return throwError(error)})
    );
  }

  public createStudent$(data: any): Observable<any> {
    return this.httpClient.put(this.consts.BASE_URL + this.consts.ADD_STUDENT, data, this.httpOption())
    .pipe(
      retry(1),
      catchError(error=> { console.log('###Error' + error); return throwError(error)})
    );
  }

  public updateStudent$(data: any): Observable<any> {
    return this.httpClient.post(this.consts.BASE_URL + this.consts.UPDATE_STUDENT, data, this.httpOption())
    .pipe(
      retry(1),
      catchError(error=> { console.log('###Error' + error); return throwError(error)})
    );
  }

  public deleteStudent$(id: number): Observable<any> {
    return this.httpClient.delete(this.consts.BASE_URL + this.consts.DELETE_STUDENT + id, this.httpOption())
    .pipe(
      retry(1),
      catchError(error=> { console.log('###Error' + error); return throwError(error)})
    );
  }

  public getProgramas$(): Observable<any> {
    return this.httpClient.get(this.consts.BASE_URL + this.consts.GET_PROGRAMS, this.httpOption())
    .pipe(
      retry(1),
      catchError(error=> { console.log('###Error' + error); return throwError(error)})
    );
  }

  public AsociarPrograma$(data: any): Observable<any> {
    return this.httpClient.post(this.consts.BASE_URL + this.consts.ASOCIAR_PROGRMA, data, this.httpOption())
    .pipe(
      retry(1),
      catchError(error=> { console.log('###Error' + error); return throwError(error)})
    );
  }
  
  public createTeacher$(data: any): Observable<any> {
    return this.httpClient.put(this.consts.BASE_URL + this.consts.ADD_TEACHER, data, this.httpOption())
    .pipe(
      retry(1),
      catchError(error=> { console.log('###Error' + error); return throwError(error)})
    );
  }

  public getTeachers$(): Observable<any> {
    return this.httpClient.get(this.consts.BASE_URL + this.consts.GET_TEACHER, this.httpOption())
    .pipe(
      retry(1),
      catchError(error=> { console.log('###Error' + error); return throwError(error)})
    );
  }
  public getTeacher$(id:number): Observable<any> {
    return this.httpClient.get(this.consts.BASE_URL + this.consts.GET_TEACHER + `/${id}`, this.httpOption())
    .pipe(
      retry(1),
      catchError(error=> { console.log('###Error' + error); return throwError(error)})
    );
  }
  
  
}
