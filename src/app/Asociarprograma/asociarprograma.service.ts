import { Injectable } from '@angular/core';
import { RestService } from '../services/rest.service';
import { ConstantsService } from '../models/constants/constants-service';
import { Programs } from '../models/Programs.model';
import { AsociarPrograma } from '../models/AsociarPrograma.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AsociarprogramaService {

  private _termino = new BehaviorSubject<string>('');
  get Termino$() { return this._termino.asObservable(); }

  public allUsers: Programs | any;
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

  public getProgramas(): void {
    this.rest.getProgramas$().subscribe((_programs) => {
      this.allUsers = _programs.result;
    },
      (error:any) => {
        if (error.status == 401 || error.status == 0)
          this.authenticate();
        else
          console.error(error);
      });
  }

  public AsociarPrograma(student: AsociarPrograma): void {
    this.rest.AsociarPrograma$(student).subscribe((_data) => {
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
