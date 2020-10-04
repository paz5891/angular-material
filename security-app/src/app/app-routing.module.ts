import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClienteFormComponent } from './private/cliente-form/cliente-form.component'; // form cliente
import { FacturaFormComponent } from './private/factura-form/factura-form.component'; // form factura
import { EmpleadoFormComponent } from './private/empleado-form/empleado-form.component'; // form empleado
import { ProductoFormComponent } from './private/producto-form/producto-form.component'; // form factura
import { ProductoFacturaFormComponent } from './private/producto-factura-form/producto-factura-form.component'; // form empleado

import { ClientesComponent } from './private/clientes/clientes.component';
import { EmpleadosComponent } from './private/empleados/empleados.component';
import { FacturasComponent } from './private/facturas/facturas.component';
import { ProductosComponent } from './private/productos/productos.component';
import { ProductosFacturasComponent } from './private/productos-facturas/productos-facturas.component';
import { LoginComponent } from './public/login/login.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'login', component: LoginComponent},
  {path: 'clientes', component: ClientesComponent, canActivate: [AuthGuard]},
  {path: 'clientes/add', component: ClienteFormComponent, canActivate: [AuthGuard]}, // redirecciona
  {path: 'clientes/:id', component: ClienteFormComponent, canActivate: [AuthGuard]}, // id redirecciona
  {path: 'empleados', component: EmpleadosComponent, canActivate: [AuthGuard]},
  {path: 'empleados/add', component: EmpleadoFormComponent, canActivate: [AuthGuard]}, // redirecciona
  {path: 'empleados/:id', component: EmpleadoFormComponent, canActivate: [AuthGuard]}, // id redirecciona
  {path: 'facturas', component: FacturasComponent, canActivate: [AuthGuard]},
  {path: 'facturas/add', component: FacturaFormComponent, canActivate: [AuthGuard]}, // redirecciona
  {path: 'facturas/:id', component: FacturaFormComponent, canActivate: [AuthGuard]}, // id redirecciona

  {path: 'productos', component: ProductosComponent, canActivate: [AuthGuard]},
  {path: 'productos/add', component: ProductoFormComponent, canActivate: [AuthGuard]}, // redirecciona
  {path: 'productos/:id', component: ProductoFormComponent, canActivate: [AuthGuard]}, // id redirecciona


  {path: 'productos-facturas', component: ProductosFacturasComponent, canActivate: [AuthGuard]},
  {path: 'productos-facturas/add', component: ProductoFacturaFormComponent, canActivate: [AuthGuard]}, // redirecciona
  {path: 'productos-facturas/:id', component: ProductoFacturaFormComponent, canActivate: [AuthGuard]}, // id redirecciona

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports:[RouterModule]
})
export class AppRoutingModule { }
