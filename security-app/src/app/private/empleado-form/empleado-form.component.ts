import { EmpleadosService } from './../../services/empleado.service';
import { Empleado } from './../../models/empleado';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-empleado-form',
  templateUrl: './empleado-form.component.html',
  styleUrls: ['./empleado-form.component.css']
})

export class EmpleadoFormComponent implements OnInit {

  empleado: Empleado = {"id": null, "codigo": "", "nombre": "", "salario": null, "creado_por": ""};
  addressForm: FormGroup;
  constructor(private fb: FormBuilder,
    private router: Router,
    private service: EmpleadosService,
    private route: ActivatedRoute) { }

  // ngOnInit(): void {
  //   this.addressForm = this.fb.group({
  //     id: null,
  //     codigo: [null, Validators.required],
  //     nombre: [null, Validators.required],
  //     salario: [null, Validators.required],
  //     creado_por: [null, Validators.required]
  //   }
  //   );
  // }

  id: string;

    ngOnInit(): void {
      this.id = this.route.snapshot.paramMap.get('id');
      if(this.id != undefined){
        console.log(this.id);
        this.service.getEmpleado(this.id).subscribe(
          res => {
            this.empleado = res[0];
            console.log(this.empleado);
          }
        ) ;
      }

      this.addressForm = this.fb.group({
        id: null,
        codigo: [null, Validators.required],
        nombre: [null, Validators.required],
        salario: [null, Validators.required],
        creado_por: [null, Validators.required]
      }
      );
    }

    onSubmit(): void {
      if(this.id != undefined){
        this.service.updateEmpleado(this.empleado).subscribe(
          res => {
            alert(res);
          }
        )
        this.router.navigate(['empleados']);
      }else{
        this.service.insertEmpleado(this.empleado).subscribe(
          res => {
            console.log(res);
          }
        );
        this.router.navigate(['empleados']);
      }
    }

  ngOnEliminar(): void {
    this.router.navigate(['empleados']);
  }
  ngOnCancelar(): void {
    this.router.navigate(['empleados']);
  }


}

// CREADO POR: MARICEL PAZ
