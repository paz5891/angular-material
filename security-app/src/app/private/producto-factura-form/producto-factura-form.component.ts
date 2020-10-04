import { ProductoFacturaService } from './../../services/producto-factura.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Productofactura } from './../../models/producto-factura';

@Component({
  selector: 'app-producto-factura-form',
  templateUrl: './producto-factura-form.component.html',
  styleUrls: ['./producto-factura-form.component.css']
})
export class ProductoFacturaFormComponent implements OnInit {

  productofactura: Productofactura = {"id": null, "factura_id": null, "producto_id": null, "cantidad": null, "subtotal": null, "creado_por": ""};
  addressForm: FormGroup;
  constructor(private fb: FormBuilder,
    private router: Router,
    private service: ProductoFacturaService,
    private route: ActivatedRoute) { }


   /* this.addressForm = this.fb.group({
      id: null,
      factura_id: [null, Validators.required],
      producto_id: [null, Validators.required],
      cantidad: [null, Validators.required],
      subtotal: [null, Validators.required],
      creado_por: [null, Validators.required]
    }
    );**/


    id:string;

    ngOnInit(): void {
      this.id = this.route.snapshot.paramMap.get('id');
      if(this.id != undefined){
        console.log(this.id);
        this.service.getProductofactura(this.id).subscribe(
          res => {
            this.productofactura = res[0];
            console.log(this.productofactura);
          }
        ) ;
      }

      this.addressForm = this.fb.group({
        id: null,
        factura_id: [null, Validators.required],
        producto_id: [null, Validators.required],
        cantidad: [null, Validators.required],
        subtotal: [null, Validators.required],
        creado_por: [null, Validators.required]
      }
      );
    }

    onSubmit(): void {

      if(this.id != undefined){
        this.service.updateProductofactura(this.productofactura).subscribe(
          res => {
            alert(res);
          }
        )
        this.router.navigate(['productos-facturas']);
      }else{
        this.service.insertProductofactura(this.productofactura).subscribe(
          res => {
            console.log(res);
          }
        );
        this.router.navigate(['productos-facturas']);
      }
    }

  ngOnEliminar(): void {
    this.router.navigate(['productos-facturas']);
  }
  ngOnCancelar(): void {
    this.router.navigate(['productos-facturas']);
  }


}

// CREADO POR: MARICEL PAZ
