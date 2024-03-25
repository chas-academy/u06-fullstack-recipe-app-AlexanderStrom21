import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginDetails } from '../interfaces/login-details';
import { Observable, catchError, throwError } from 'rxjs';
import { User } from '../interfaces/user';

interface ResultData{
  token: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://127.0.0.1:8000/api/';

  private httpOptions ={
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}
  constructor(private http:HttpClient) {  }

  loginUser(loginDetails: LoginDetails){
    this.http.post<ResultData>(this.baseUrl+'login', loginDetails, this.httpOptions).pipe(
      catchError(this.handleError)).subscribe(result =>{
        this.httpOptions.headers = this.httpOptions.headers.set('Authorization', "Bearer " + result.token);
      })
  }

  getUser2(): Observable<User[]>{
    return this.http.get<User[]>(this.baseUrl+'getuser/2', this.httpOptions);
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
