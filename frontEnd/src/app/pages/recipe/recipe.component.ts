import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, ParamMap, RouterLink } from '@angular/router';
import { Recipe } from '../../interfaces/recipe';
import { RecipeService } from '../../services/recipe.service';
import { RecipeidformatterPipe } from '../../pipe/recipe-idformater.pipe';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-recipe',
  standalone: true,
  imports: [RecipeidformatterPipe, RouterLink, CommonModule],
  templateUrl: './recipe.component.html',
  styleUrl: './recipe.component.css'
})

export class RecipeComponent {
  recipe?: Recipe;
  id: any | null = null;

  constructor(private recipeService: RecipeService, private route: ActivatedRoute){}

  ngOnInit(): void{
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = params.get('id');
        if (this.id){
          this.getOneRecipe();
        }
    });
  }

  getOneRecipe(){
    this.recipeService.getRecipe(this.id).subscribe({
      next: (result) =>{
      console.table(result);
      let recipe: Recipe = {        
          label: result.recipe.label, 
          image: result.recipe.image,
          ingredientLines: result.recipe.ingredientLines,
          totalTime: result.recipe.totalTime,
          selfref: result._links.self.href
        };
        console.table(recipe);
        this.recipe = recipe;
      }, 
      error: (error) => {
        console.error("didnt work", error);
      }
    });
    }
  }
