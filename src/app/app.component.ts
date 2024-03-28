import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';
import { LoginDetails } from './interfaces/login-details';
import { User } from './interfaces/user';
import { CommonModule } from '@angular/common';
import { RegisterDetails } from './interfaces/register-details';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})


export class AppComponent {
  title = 'frontEnd';

  registerDetails: RegisterDetails;
  loginDetails: LoginDetails; 

  
  user?: User;


  constructor(private auth: AuthService){
    this.registerDetails = {
      fname:'',
      email:'',
      password:'',
      confirmPassword:''
    }
    this.loginDetails = {
      email:'user@user.user',
      password:'user'
    }


    auth.loginUser(this.loginDetails);
    
  }
  
  // getUser(){
  //   this.auth.getUser2().subscribe(res =>{
  //     console.log(res[0]);
  //     this.user = res [0];
  //   })
  // }

}
