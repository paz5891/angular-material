import { Empleado } from 'src/app/models/empleado';
import { EmpleadosService } from './../../services/empleado.service';
import { Router } from '@angular/router';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { EmpleadosDataSource } from './empleados-datasource';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.css']
})
export class EmpleadosComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<Empleado>;
  dataSource: EmpleadosDataSource;

  constructor(private empleadoService: EmpleadosService,
              private router: Router,
              private fb: FormBuilder
    ) { }

  EmpForm: FormGroup;
  empleados: Empleado[] = [];

  displayedColumns = ['id', 'codigo', 'nombre', 'salario', 'creado_por', 'modificar', 'eliminar'];

  ngOnInit(): void {
    this.dataSource = new EmpleadosDataSource();
    this.empleadoService.getEmpleados().subscribe(

      (res) => {
        this.empleados = res;
        this.dataSource.data = this.empleados;
      }
    );
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
  onModificar(id){
    this.router.navigate(['empleados/' + id]);
   }

   onEliminar(id): void {
    if(confirm('Maricel Paz ¿Desea eliminar el registro?')){
      this.empleadoService.deleteEmpleado(id).subscribe(
        res => {

        }
      );
    }
    this.router.navigate(['empleados'])
  .then(() => {
    window.location.reload();
  });
  }
}

// CREADO POR: MARICEL PAZ
