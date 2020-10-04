import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Producto } from './../models/producto';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private URL = 'http://localhost:3000/';

  constructor(private httpCliente: HttpClient) { }

getProductos(): Observable<Producto[]>{
return this.httpCliente.get<Producto[]>(this.URL + 'productos');
}

getProducto(id): Observable<Producto>{
  return this.httpCliente.get<Producto>(this.URL + `productos/${id}`);
}

insertProducto(producto): Observable<any> {
  console.log(producto);
  return this.httpCliente.post<any>(this.URL + 'productos', producto);
}

updateProducto(producto): Observable<any> {
  return this.httpCliente.put<any>(this.URL + `productos/${producto.id}`, producto);
}

deleteProducto(id): Observable<any> {
  return this.httpCliente.delete<any>(this.URL + `productos/${id}`);
}

}
