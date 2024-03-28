import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';


export const authGuard: CanActivateFn = (route, state) => {
  // let isLoggedIn = false;

  // console.log("trying to log in");

  // const auth: AuthService = inject(AuthService);

  // auth.loggedIn$.subscribe((v) => console.log(v));

  // return isLoggedIn;
  return true;
};
