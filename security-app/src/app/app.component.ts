// import { AppComponent } from './../../../material-app/src/app/app.component';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SecurityService } from './services/security.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout'; // angularM
import { Observable } from 'rxjs'; // angularM
import { map, shareReplay } from 'rxjs/operators'; // angularM

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'security-app';

 isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    ); // angularM

  constructor(
    private security: SecurityService,
    private router: Router,
    private breakpointObserver: BreakpointObserver // angularM
    ){

  }
  logedIn(){
    return this.security.logedIn ();
  }

  onLogout(){
    this.security.logout();
    this.router.navigate(['login']);
  }
}
