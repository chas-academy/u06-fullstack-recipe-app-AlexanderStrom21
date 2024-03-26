import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  private baseUrl = 'https://api.edamam.com/api/recipes/v2?type=public';
  private app_key = 'd751d17f';
  private app_id = 'd8313a3b3cadbbf8c76d7df1acad0fce';

  private httpOptions ={
  headers: new HttpHeaders({
    'accept': 'application/json',
    'Accept-Language': 'en'
  })
}
  constructor(private http:HttpClient) { }

  getRecipes(searchterm: string): Observable<any[]>{
    let url = this.baseUrl + searchterm + "&app_id=" + this.app_id + "&app_key=" + this.app_key + "&cuisineType=Asian&mealType=Breakfast";
    return this.http.get<any[]>(this.baseUrl, this.httpOptions);
  }
}
