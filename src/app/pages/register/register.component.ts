import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators, } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { RegisterDetails } from '../../interfaces/register-details';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})



export class RegisterComponent {
  
  registerForm = new FormGroup({
    name: new FormControl('',[
      Validators.required, 
      Validators.minLength(6),
      Validators.maxLength(40)
    ]),
    email: new FormControl('',[ 
    Validators.required, 
    Validators.minLength(6),
    Validators.maxLength(40)]),
    password: new FormControl('',[    
      Validators.required, 
      Validators.minLength(6),
      Validators.maxLength(40),
    ]),

    password_confirmation: new FormControl('',[ 
    Validators.required]),


  });

  constructor(private authService: AuthService) { }

  onSubmit(): void {
    const regData = this.registerForm.value;
    this.authService.registerUser(regData as RegisterDetails).subscribe({
       next:(result) => {
      console.log("Welcome as a User!");
    },
      error:(error) =>{
      console.log("Registration Error");
    }
  });

  }
}
