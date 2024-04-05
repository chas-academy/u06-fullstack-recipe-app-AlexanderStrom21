import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginDetails } from '../interfaces/login-details';
import { BehaviorSubject, Observable, catchError, throwError } from 'rxjs';
import { User } from '../interfaces/user';
import { RegisterDetails } from '../interfaces/register-details';
import { LoggedInUser } from '../interfaces/loggedin-user';

interface ResultData{
  token: string,
  user: User
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedIn = new BehaviorSubject<LoggedInUser>({user: undefined, loginState: false})
  loggedIn$ = this.loggedIn.asObservable(); //asObservable updaterar så att den alltid updateras med nyaste värdet
  private signedIn = new BehaviorSubject<boolean>(false)
  signedIn$ = this.signedIn

  private baseUrl = 'https://u06-fullstack-recipe-app-alexanderstrom21.onrender.com/api/';

  private httpOptions ={
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}
  constructor(private http:HttpClient) {  }

  updateLoginState(loginstate: LoggedInUser){
    this.loggedIn.next(loginstate);
  }

  getLoginStatus(){
    return this.loggedIn.value.loginState;
  }
  

  registerUser(register: RegisterDetails): Observable<ResultData>{
    return this.http.post<ResultData>(this.baseUrl + 'register', register, this.httpOptions).pipe(
      catchError(this.handleError))
    
  }
  loginUser(loginDetails: LoginDetails){
    this.http.post<any>(this.baseUrl + 'login', loginDetails, this.httpOptions).pipe(
      catchError(this.handleError)).subscribe(result =>{
        this.updateLoginState({
          user: result.user,
          loginState: true
        });
        this.httpOptions.headers = this.httpOptions.headers.set('Authorization', "Bearer " + result.token);
      })
      //subscribe result, pipe errors,
  }

  logoutUser(){
    this.updateLoginState({
      user: undefined,
      loginState: false,
    });
    this.httpOptions.headers = this.httpOptions.headers.set(
      'Authorization',
      'Bearer ')
  }
  getCurrentUser(){
    let user: User;
    user = {
      id: 0,
      name: "",
      email: "",
      created_at: ""
    }
    this.http.get<User[]>(this.baseUrl+'getUser/' + this.loggedIn.value.user?.id, this.httpOptions).subscribe(result => user = result[0]);
    return user;
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
