const Joi = require('joi')
const {recipes} = require('../../data/recipes.json')
const {findAllRecipes, findRecipeId, saveRecipe, deleteRecipe} = require('../model/recipe_model');
const PhotoUrl = require ('../services/create_photo');

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
async function createRecipe(recipe){
    if(!recipe.photo){
        recipe.photo = await PhotoUrl.viewPhoto({keywords: recipe.keywords})
    }
    return saveRecipe(recipe);
   
}
function updateRecipe(id, fields) {
    return updateRecipe(id, fields)
  }
function removeRecipe(id) {
    const recipe = findRecipeId({ id })
    if (!recipe) {
      return false
    }
    deleteRecipe(id)
    return true
  }

function validateRecipe(recipe){
    
    const schema = Joi.object({
        title: Joi.string().min(3).max(30).required(),
        keywords: Joi.array(),
        photo: Joi.string().uri().optional(),
        })
        

    const {error, value} = schema.validate(recipe);
    return {error, value};
}


module.exports = {
    getAllRecipes,
    getRecipePage, 
    validateRecipe, 
    getRecipe,
    createRecipe, 
    removeRecipe, 
    updateRecipe
};
