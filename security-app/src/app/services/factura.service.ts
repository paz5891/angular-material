import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Factura } from './../models/factura';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FacturaService {

  private URL = 'http://localhost:3000/';

  constructor(private httpCliente: HttpClient) { }

getFacturas(): Observable<Factura[]>{
return this.httpCliente.get<Factura[]>(this.URL + 'facturas');
}

getFactura(id): Observable<Factura>{
  return this.httpCliente.get<Factura>(this.URL + `facturas/${id}`);
}

insertFactura(factura): Observable<any> {
  console.log(factura);
  return this.httpCliente.post<any>(this.URL + 'facturas', factura);
}

updateFactura(factura): Observable<any> {
  return this.httpCliente.put<any>(this.URL + `facturas/${factura.id}`, factura);
}

deleteFactura(id): Observable<any> {
  return this.httpCliente.delete<any>(this.URL + `facturas/${id}`);
}

}
