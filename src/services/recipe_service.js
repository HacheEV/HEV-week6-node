const Joi = require('joi')
const {recipes} = require('../../data/recipes.json')
const PhotoUrl = require ('../services/create_photo');
const Model = require ('../model/recipe_model');

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
    return Model.findAllRecipes();
}
function getRecipe(id){
    return Model.findRecipeId(id);
}

function recipeById (id) {
    const recipe = Service.getRecipe({id});
    if(!recipe) return "There are no recipe!"
    return recipe;
}
async function createRecipe(recipe){
    if(!recipe.photo){
        recipe.photo = await PhotoUrl.viewPhoto({keywords: recipe.keywords})
    }
    return Model.saveRecipe(recipe);
   
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
function updateRecipe(id, fields) {
    return RecipeModel.updateRecipe(id, fields)
  }
  
function removeRecipe(id){
    const recipe = Service.getRecipe({id});
    if(!recipe) return false;
    Model.removeRecipe(id)
    return true;
}

module.exports = {
    getAllRecipes,
    getRecipePage, 
    validateRecipe, 
    getRecipe,
    createRecipe,
    recipeById,
    removeRecipe,
    updateRecipe
};
