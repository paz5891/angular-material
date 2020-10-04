import { Producto } from 'src/app/models/producto';
import { ProductoService } from './../../services/producto.service';
import { Router } from '@angular/router';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { ProductosDataSource } from './productos-datasource';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<Producto>;
  dataSource: ProductosDataSource;

  constructor(private productoService: ProductoService,
              private router: Router,
              private fb: FormBuilder
    ) { }

  ProdForm: FormGroup;
  productos: Producto[] = [];

  displayedColumns = ['id', 'nombre', 'precio', 'creado_por', 'modificar', 'eliminar'];

  ngOnInit(): void {
    this.dataSource = new ProductosDataSource();
    this.productoService.getProductos().subscribe(

      (res) => {
        this.productos = res;
        this.dataSource.data = this.productos;
      }
    );
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
  onModificar(id){
    this.router.navigate(['productos/'+id]);
   }

   onEliminar(id): void {
    if(confirm('Maricel Paz ¿Desea eliminar el registro?')){
      this.productoService.deleteProducto(id).subscribe(
        res => {

        }
      );
    }
    this.router.navigate(['productos'])
  .then(() => {
    window.location.reload();
  });
  }
}

// CREADO POR: MARICEL PAZ
