import { Component } from '@angular/core';
import { LoginDetails } from '../../interfaces/login-details';
import { AuthService } from '../../services/auth.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators,} from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginForm = new FormGroup({
    email: new FormControl('',[ 
      Validators.required, 
      Validators.minLength(6),
      Validators.maxLength(40)]),
      password: new FormControl('',[    
        Validators.required, 
        Validators.minLength(6),
        Validators.maxLength(40),
      ]),
  })

constructor(private authService: AuthService) { 

}

loggOut(){
  this.authService.logoutUser();
}
onSubmit(): void{
  const loginData = this.loginForm.value;
  this.authService.loginUser(loginData as LoginDetails)

  
  if(401)
  {
    console.log("wrong try again")
  }
  else{
    console.log("Welcome")
  }
}
}