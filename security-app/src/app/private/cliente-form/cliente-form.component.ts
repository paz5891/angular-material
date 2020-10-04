import { ClienteService } from './../../services/cliente.service';
import { Cliente } from './../../models/cliente';

import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-cliente-form',
  templateUrl: './cliente-form.component.html',
  styleUrls: ['./cliente-form.component.css']
})
export class ClienteFormComponent implements OnInit {
  // datos: Cliente[];
  cliente: Cliente = {"id": "", "nombre": "", "direccion": "", "nit": "", "creado_por": ""};
  addressForm: FormGroup;
  constructor(private fb: FormBuilder,
    private router: Router,
    private service: ClienteService,
    private route: ActivatedRoute) { }

    id: string;

    ngOnInit(): void {
      this.id = this.route.snapshot.paramMap.get('id');
      if(this.id != undefined){
        console.log(this.id);//
        this.service.getCliente(this.id).subscribe(
          res => {
            this.cliente = res[0];
            console.log(this.cliente);
          }
        ) ;
      }

      this.addressForm = this.fb.group({
        id: null,
        nombre: [null, Validators.required],
        direccion: [null, Validators.required],
        nit: [null, Validators.required],
        creado_por: [null, Validators.required]
      }
      );
    }

    onSubmit(): void {
      if(this.id != undefined){
        this.service.updateCliente(this.cliente).subscribe(
          res => {
            alert(res);
          }
        )
        this.router.navigate(['clientes']);
      }else{
        this.service.insertCliente(this.cliente).subscribe(
          res => {
            console.log(res);
          }
        );
        this.router.navigate(['clientes']);
      }
    }
  ngOnEliminar(): void {
    this.router.navigate(['clientes']);
  }
  ngOnCancelar(): void {
    this.router.navigate(['clientes']);
  }


}

// CREADO POR: MARICEL PAZ
