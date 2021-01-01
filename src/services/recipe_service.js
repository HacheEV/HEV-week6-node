const Joi = require('joi')
const {recipes} = require('../../data/recipes.json')
const {findAllRecipes, findRecipeId, saveRecipe} = require('../model/recipe_model');

function getRecipePage({page, size}){
    const recipes = findAllRecipes();
    const start = (page-1) * size;
    const end = start + size;

    if (end > recipes.length){
        return "There are not recipes in this page"
    }else{
        return recipes.slice(start, end);
    }
  
    

}
function getAllRecipes(){
    return findAllRecipes();
}
function getRecipe(id){
    return findRecipeId(id);
}
function createRecipe(recipe){
    return saveRecipe(recipe);
   
}

function validateRecipe(recipe){
    const recipesId = recipes.length + 1;
    const photo = recipe.keywords.join(",");
    
    const schema = Joi.object({
        id: Joi.number().default(recipesId),
        title: Joi.string().min(3).max(30).required(),
        keywords: Joi.array(),
        photo: Joi.string().default(`https://source.unsplash.com/1600x900/?${photo}`)
        })
        

    const {error, value} = schema.validate(recipe);
    return {error, value};
}

module.exports = {
    getAllRecipes,
    getRecipePage, 
    validateRecipe, 
    getRecipe,
    createRecipe
};
