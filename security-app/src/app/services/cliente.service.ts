import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Cliente } from './../models/cliente';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private URL = 'http://localhost:3000/';

  constructor(private httpCliente: HttpClient) { }

getClientes(): Observable<Cliente[]>{
return this.httpCliente.get<Cliente[]>(this.URL + 'clientes');
}

getCliente(id): Observable<Cliente>{
  return this.httpCliente.get<Cliente>(this.URL + `clientes/${id}`);
}

insertCliente(cliente): Observable<any> {
  console.log(cliente);
  return this.httpCliente.post<any>(this.URL + 'clientes', cliente);
}

updateCliente(cliente): Observable<any> {
  return this.httpCliente.put<any>(this.URL + `clientes/${cliente.id}`, cliente);
}

deleteCliente(id): Observable<any> {
  return this.httpCliente.delete<any>(this.URL + `clientes/${id}`);
}

}
