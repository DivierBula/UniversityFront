import { Injectable } from "@angular/core";
import { Auth } from "../auth.model";

@Injectable({
    providedIn: 'root',
})
export class ConstantsService {
    public BASE_URL: string = "https://localhost:44359/api/";
    public GET_PROGRAMSxSTUDENT: string = 'program/GetProgramsxStudent/';
    public GET_STUDENTxPROGRAMS: string = 'Student/GetStudentxProgram/';
    public GET_STUDENT: string = 'Student/get';
    public GET_PROGRAMS: string = 'Program/get';
    public GET_TEACHER: string = 'Teacher/get';
    public ADD_STUDENT: string = 'Student/Add';
    public UPDATE_STUDENT: string = 'Student/Update';
    public DELETE_STUDENT: string = 'Student/Delete/';
    public ADD_TEACHER: string = 'Teacher/Add';
    public ASOCIAR_PROGRMA: string = 'Student/EnrollProgram';
    public AUTH: string = 'Autenticacion/login';
    public TOKEN_AUTH: string = 'Auth';
    public USER: Auth = {
        Usuario: "Testeo",
        Password: "123"
    } ;
}
