import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginDetails } from '../interfaces/login-details';
import { BehaviorSubject, Observable, catchError, throwError } from 'rxjs';
import { User } from '../interfaces/user';
import { RegisterDetails } from '../interfaces/register-details';


interface ResultData{
  token: string,
  user: User
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private signedIn = new BehaviorSubject<boolean>(false)
  signedIn$ = this.signedIn

  private baseUrl = 'http://127.0.0.1:8000/api/';

  private httpOptions ={
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}
  constructor(private http:HttpClient) {  }


  registerUser(register: RegisterDetails): Observable<ResultData>{
    return this.http.post<ResultData>(this.baseUrl + 'register', register, this.httpOptions).pipe(
      catchError(this.handleError))
    
  }
  loginUser(loginDetails: LoginDetails){
    this.http.post<ResultData>(this.baseUrl+'login', loginDetails, this.httpOptions).pipe(
      catchError(this.handleError)).subscribe(result =>{
        this.httpOptions.headers = this.httpOptions.headers.set('Authorization', "Bearer " + result.token);
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
