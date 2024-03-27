import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  private baseUrl = 'https://api.edamam.com/api/recipes/v2?type=public';
  private app_key = 'd8313a3b3cadbbf8c76d7df1acad0fce';
  private app_id = 'd751d17f';

  private httpOptions ={
  headers: new HttpHeaders({
    'accept': 'application/json',
    'Accept-Language': 'en'
  })
}
  constructor(private http:HttpClient) { }

  getRecipes(searchterm: string): Observable<any>{
    let cuisineType = "Asian";
    let mealType = "Breakfast";
    let url = this.baseUrl + "&q=" + searchterm + "&app_id=" + this.app_id + "&app_key=" + this.app_key + "&cuisineType=" + cuisineType + "&mealType=" + mealType;
    return this.http.get<any>(url, this.httpOptions);
  // istället för any så kan man bygga upp ett interface för att kunna ge mer precis sök funktion
  }
}

