import { Factura } from 'src/app/models/factura';
import { FacturaService } from './../../services/factura.service';
import { Router } from '@angular/router';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { FacturasDataSource } from './facturas-datasource';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-facturas',
  templateUrl: './facturas.component.html',
  styleUrls: ['./facturas.component.css']
})
export class FacturasComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<Factura>;
  dataSource: FacturasDataSource;

  constructor(private facturaService: FacturaService,
              private router: Router,
              private fb: FormBuilder
    ) { }

  FactForm: FormGroup;
  facturas: Factura[] = [];

  displayedColumns = ['id', 'cliente_id', 'empleado_id', 'estado', 'creado', 'modificar', 'eliminar'];

  ngOnInit(): void {
    this.dataSource = new FacturasDataSource();
    this.facturaService.getFacturas().subscribe(

      (res) => {
        this.facturas = res;
        this.dataSource.data = this.facturas;
      }
    );
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
  onModificar(id){
    this.router.navigate(['facturas/'+id]);
   }

   onEliminar(id): void {
    if(confirm('Maricel Paz ¿Desea eliminar el registro?')){
      this.facturaService.deleteFactura(id).subscribe(
        res => {
        }
      );
    }
    this.router.navigate(['facturas'])
  .then(() => {
    window.location.reload();
  });
  }
}
// CREADO POR: MARICEL PAZ
