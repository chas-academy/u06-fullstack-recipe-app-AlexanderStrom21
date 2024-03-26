import { Routes } from '@angular/router';
import { RecipeComponent } from './pages/recipe/recipe.component';
import { RecipesComponent } from './pages/recipes/recipes.component';
import { ProfileComponent } from './pages/profile/profile.component';

export const routes: Routes = [
    {path:'', component:RecipesComponent},
    {path:'recipe:id', component:RecipeComponent},
    {path:'profile', component:ProfileComponent}
];
