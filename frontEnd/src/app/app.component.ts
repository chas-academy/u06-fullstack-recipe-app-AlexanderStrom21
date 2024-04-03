import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';
import { LoginDetails } from './interfaces/login-details';
import { User } from './interfaces/user';
import { AsyncPipe, CommonModule } from '@angular/common';
import { RegisterDetails } from './interfaces/register-details';
import { Observable } from 'rxjs';
import { LoggedInUser } from './interfaces/loggedin-user';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive, AsyncPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})


export class AppComponent {
  title = 'frontEnd';

  registerDetails: RegisterDetails;
  loginDetails: LoginDetails; 
  loggedIn$: Observable<LoggedInUser>
  
  user?: User;


  constructor(private auth: AuthService){
    this.registerDetails = {
      name:'',
      email:'',
      password:'',
      password_confirmation:''
    }
    this.loginDetails = {
      email:'',
      password:''
    }
    this.loggedIn$ = this.auth.loggedIn$;
    
  }
  
  // getUser(){
  //   this.auth.getUser2().subscribe(res =>{
  //     console.log(res[0]);
  //     this.user = res [0];
  //   })
  // }

}
