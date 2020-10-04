import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Productofactura } from './../models/producto-factura';

@Injectable({
  providedIn: 'root'
})
export class ProductoFacturaService {

  private URL = 'http://localhost:3000/';

  constructor(private httpCliente: HttpClient) { }

getProductosfacturas(): Observable<Productofactura[]>{
return this.httpCliente.get<Productofactura[]>(this.URL + 'productos-facturas');
}

getProductofactura(id): Observable<Productofactura>{
  return this.httpCliente.get<Productofactura>(this.URL + `productos-facturas/${id}`);
}

insertProductofactura(productofactura): Observable<any> {
  console.log(productofactura);
  return this.httpCliente.post<any>(this.URL + 'productos-facturas', productofactura);
}

updateProductofactura(productofactura): Observable<any> {
  return this.httpCliente.put<any>(this.URL + `productos-facturas/${productofactura.id}`, productofactura);
}

deleteProductofactura(id): Observable<any> {
  return this.httpCliente.delete<any>(this.URL + `productos-facturas/${id}`);
}

}
