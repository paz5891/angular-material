import { Cliente } from 'src/app/models/cliente';
import { ClienteService } from './../../services/cliente.service';
import { Router } from '@angular/router';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { ClientesDataSource } from './clientes-datasource';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<Cliente>;
  dataSource: ClientesDataSource;

  constructor(private clienteService: ClienteService,
              private router: Router,
              private fb: FormBuilder
    ) { }

  // dataSource: Cliente[];
  ClientForm: FormGroup;
  clientes: Cliente[] = [];

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'nombre', 'direccion', 'nit', 'creado_por', 'modificar', 'eliminar'];

  // ngOnInit() {
  //   this.dataSource = new ClientesDataSource();
  // }

  ngOnInit(): void {
    this.dataSource = new ClientesDataSource();
    this.clienteService.getClientes().subscribe(

      (res) => {
        this.clientes = res;
        this.dataSource.data = this.clientes;
      }
    );
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
  onModificar(id){
    this.router.navigate(['clientes/' + id]);
   }

   onEliminar(id): void {
    if(confirm('Maricel Paz ¿Desea eliminar el registro?')){
      this.clienteService.deleteCliente(id).subscribe(
        res => {

        }
      );
    }
    this.router.navigate(['clientes'])
  .then(() => {
    window.location.reload();
  });
  }
}

// CREADO POR: MARICEL PAZ
