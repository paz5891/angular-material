import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Empleado } from './../models/empleado';
//angular
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmpleadosService {

  private URL = 'http://localhost:3000/';
  constructor(private httpCliente: HttpClient) { }

  getEmpleados(){
    return this.httpCliente.get<Empleado[]>(this.URL + 'empleados');
  }
  //angular
  getEmpleado(id): Observable<Empleado>{
    return this.httpCliente.get<Empleado>(this.URL + `empleados/${id}`);
  }

  insertEmpleado(empleado): Observable<any> {
    console.log(empleado);
    return this.httpCliente.post<any>(this.URL + 'empleados', empleado);
  }

  updateEmpleado(empleado): Observable<any> {
    return this.httpCliente.put<any>(this.URL + `empleados/${empleado.id}`, empleado);
  }

  deleteEmpleado(id): Observable<any> {
    return this.httpCliente.delete<any>(this.URL + `empleados/${id}`);
  }
}
