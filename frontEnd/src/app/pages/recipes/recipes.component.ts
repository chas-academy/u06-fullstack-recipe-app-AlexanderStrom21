import { Component } from '@angular/core';
import { Recipe } from '../../interfaces/recipe';
import { RecipeService } from '../../services/recipe.service';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { RecipeidformatterPipe } from '../../pipe/recipe-idformater.pipe';


@Component({
  selector: 'app-recipes',
  standalone: true,
  imports: [FormsModule, RouterLink, RecipeidformatterPipe],
  templateUrl: './recipes.component.html',
  styleUrl: './recipes.component.css'
})
export class RecipesComponent {

  recipes?: Recipe[];

  searchterm = "chicken";
  dishType = "main course";
  cuisineType = "american";
  mealType = "dinner";
  constructor(private recipeService: RecipeService){}

  searchRecipe(){
    this.recipeService.getRecipes(this.searchterm, this.cuisineType, this.mealType, this.dishType).subscribe((result) =>{
      console.table(result);
      let recipes: Recipe[];
        recipes = result.hits.map((item: { recipe: { label: any; image: any; ingredientLines: any; totalTime: any; }; _links: { self: { href: any; }; }; }) =>{
        return {
          label: item.recipe.label, 
          image: item.recipe.image,
          ingredientLines: item.recipe.ingredientLines,
          totalTime: item.recipe.totalTime,
          selfref: item._links.self.href
        };
      });
      console.table(recipes);
      this.recipes = recipes;
    })
  }
}
