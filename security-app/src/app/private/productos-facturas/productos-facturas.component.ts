import { Productofactura } from 'src/app/models/producto-factura';
import { ProductoFacturaService } from './../../services/producto-factura.service';
import { Router } from '@angular/router';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { ProductosfacturasDataSource } from './productos-facturas-datasource';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-productos-facturas',
  templateUrl: './productos-facturas.component.html',
  styleUrls: ['./productos-facturas.component.css']
})
export class ProductosFacturasComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<Productofactura>;
  dataSource: ProductosfacturasDataSource;

  constructor(private productoFacturaService: ProductoFacturaService,
              private router: Router,
              private fb: FormBuilder
    ) { }

  ProdfactForm: FormGroup;
  productosfacturas: Productofactura[] = [];

  displayedColumns = ['id', 'factura_id', 'producto_id', 'cantidad', 'subtotal', 'creado_por', 'modificar', 'eliminar'];

  ngOnInit(): void {
    this.dataSource = new ProductosfacturasDataSource();
    this.productoFacturaService.getProductosfacturas().subscribe(

      (res) => {
        this.productosfacturas = res;
        this.dataSource.data = this.productosfacturas;
      }
    );
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
  onModificar(id){
    this.router.navigate(['productos-facturas/'+id]);
   }

   onEliminar(id): void {
    if(confirm('Maricel Paz ¿Desea eliminar el registro?')){
      this.productoFacturaService.deleteProductofactura(id).subscribe(
        res => {

        }
      );
    }
    this.router.navigate(['productos-facturas'])
  .then(() => {
    window.location.reload();
  });
  }
}

// CREADO POR: MARICEL PAZ
