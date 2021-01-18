const Joi = require('joi')
const {recipes} = require('../../data/recipes.json');
const { get } = require('../controllers/recipe_controller');
const Model = require('../model/recipe_model');
const PhotoUrl = require ('../services/create_photo');

function getRecipePage({page, size}){
    const recipes = Model.findAllRecipes();
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
function filterAll (keywords, title){
    let recipes = getAllRecipes();
    if(keywords){
       recipes = recipes.filter( recipe => (recipe.keywords.some(keyword => keywords.toLowerCase().includes(keyword))));
       if(title){
        return recipes = recipes.filter(recipe => recipe.title.toLowerCase().includes(title.toLowerCase()))
        }
    }
     
}

function filterByKeywords (keywords){
    
    const recipes = getAllRecipes();    
    return recipes.filter( recipe => (recipe.keywords.some(keyword => keywords.toLowerCase().includes(keyword))))
 
}

function filterByTitle (title){
    const recipes = getAllRecipes();
    return recipes.filter(recipe => recipe.title.toLowerCase().includes(title.toLowerCase()))
}
async function createRecipe(recipe){
    if(!recipe.photo){
        recipe.photo = await PhotoUrl.viewPhoto({keywords: recipe.keywords})
    }
    return Model.saveRecipe(recipe);
   
}
function putRecipe(id, fields) {
    return Model.updateRecipe(id, fields)
  }
  
function removeRecipe(id) {
    const recipe = Model.findRecipeId(id)
    if (!recipe) {
      return false
    }
    Model.deleteRecipe(id)
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
    filterByKeywords,
    filterByTitle, 
    filterAll,
    putRecipe
};
