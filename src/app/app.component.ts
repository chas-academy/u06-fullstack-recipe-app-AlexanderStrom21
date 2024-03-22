import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';
import { LoginDetails } from './interfaces/login-details';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontEnd';

  loginDetails: LoginDetails; 

  constructor(auth: AuthService){
    this.loginDetails = {
      email:'user@user.user',
      password:'user'
    }

    auth.loginUser(this.loginDetails);
    
  }
}
