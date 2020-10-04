import { ProductoService } from './../../services/producto.service';
import { Producto } from './../../models/producto';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-producto-form',
  templateUrl: './producto-form.component.html',
  styleUrls: ['./producto-form.component.css']
})
export class ProductoFormComponent implements OnInit {

  producto: Producto = {"id": null, "nombre": "", "precio": null, "creado_por": ""};
  addressForm: FormGroup;
  constructor(private fb: FormBuilder,
    private router: Router,
    private service: ProductoService,
    private route: ActivatedRoute) { }

    id:string;

      ngOnInit(): void {
        this.id = this.route.snapshot.paramMap.get('id');
        if(this.id != undefined){
          console.log(this.id);//
          this.service.getProducto(this.id).subscribe(
            res => {
              this.producto = res[0];
              console.log(this.producto);
            }
          ) ;
        }

        this.addressForm = this.fb.group({
          id: null,
          nombre: [null, Validators.required],
          precio: [null, Validators.required],
          creado_por: [null, Validators.required]
        }
        );
      }

      onSubmit(): void {

        if(this.id != undefined){
          this.service.updateProducto(this.producto).subscribe(
            res => {
              alert(res);
            }
          )
          this.router.navigate(['productos']);
        }else{
          this.service.insertProducto(this.producto).subscribe(
            res => {
              console.log(res);
            }
          );
          this.router.navigate(['productos']);
        }
      }

  ngOnEliminar(): void {
    this.router.navigate(['productos']);
  }
  ngOnCancelar(): void {
    this.router.navigate(['productos']);
  }


}
// CREADO POR: MARICEL PAZ
