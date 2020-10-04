import { FacturaService } from './../../services/factura.service';
import { Factura } from './../../models/factura';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-factura-form',
  templateUrl: './factura-form.component.html',
  styleUrls: ['./factura-form.component.css']
})
export class FacturaFormComponent implements OnInit {

  factura: Factura = {"id": null, "cliente_id": "", "empleado_id": null, "estado": null, "creado": null};
  addressForm: FormGroup;
  constructor(private fb: FormBuilder,
    private router: Router,
    private service: FacturaService,
    private route: ActivatedRoute) { }

  // ngOnInit(): void {
  //   this.addressForm = this.fb.group({
  //     id: null,
  //     cliente_id: [null, Validators.required],
  //     empleado_id: [null, Validators.required],
  //     estado: [null, Validators.required],
  //     creado: [null, Validators.required]
  //   }
  //   );
  // }

  id:string;

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    if(this.id != undefined){
      console.log(this.id);
      this.service.getFactura(this.id).subscribe(
        res => {
          this.factura = res[0];
          console.log(this.factura);
        }
      ) ;
    }

    this.addressForm = this.fb.group({
      id: null,
      cliente_id: [null, Validators.required],
      empleado_id: [null, Validators.required],
      estado: [null, Validators.required],
      creado: [null, Validators.required]
    }
    );
  }
  onSubmit(): void {
    if(this.id != undefined){
      this.service.updateFactura(this.factura).subscribe(
        res => {
          alert(res);
        }
      )
      this.router.navigate(['facturas']);
    }else{
      this.service.insertFactura(this.factura).subscribe(
        res => {
          console.log(res);
        }
      );
      this.router.navigate(['facturas']);
    }
  }

  ngOnEliminar(): void {
    this.router.navigate(['facturas']);
  }
  ngOnCancelar(): void {
    this.router.navigate(['facturas']);
  }


}

// CREADO POR: MARICEL PAZ
