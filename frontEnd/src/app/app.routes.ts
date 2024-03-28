import { Routes } from '@angular/router';
import { RecipeComponent } from './pages/recipe/recipe.component';
import { RecipesComponent } from './pages/recipes/recipes.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';

export const routes: Routes = [
    {path:'', component:RecipesComponent},
    {path:'recipe:id', component:RecipeComponent},
    {path:'profile', component:ProfileComponent},
    {path:'login', component:LoginComponent},
    {path:'register', component:RegisterComponent}
];