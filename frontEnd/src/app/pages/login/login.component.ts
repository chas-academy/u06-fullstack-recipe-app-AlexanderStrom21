import { Component } from '@angular/core';
import { LoginDetails } from '../../interfaces/login-details';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginDetails: LoginDetails;

constructor(private authService: AuthService) { 
  this.loginDetails ={
    email: "alex@alex.alex",
    password: "alexalex"
}

}
login(){
  this.authService.loginUser(this.loginDetails);

}
}