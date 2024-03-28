export interface Recipe {
    //här fyller vi i vilka delar vi vill ta ut från vårt api recipie
    label: string,
    image: string, 
    ingredientLines: string,
    totalTime: number,
    selfref: string
}
