import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginDetails } from '../interfaces/login-details';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://127.0.0.1/api/';

  private httpOptions ={
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}
  constructor(private http:HttpClient) {  }

  loginUser(loginDetails: LoginDetails){
    this.http.post<any>(this.baseUrl+'login', loginDetails, this.httpOptions).pipe(
      catchError(this.handleError)).subscribe(result =>{
        console.log(result);
        localStorage.setItem("token", result.token);
      })
  }
  private handleError(error:HttpErrorResponse){
    if(error.status === 404){
      console.error('an error occurred:', error.error);
    }else {
      console.error(
        `backend returned error code: ${error.status}, body was`, error.error); 
      
    }
    return throwError(()=> new Error('somthing went wrong, please try again later.'));
  }
}
