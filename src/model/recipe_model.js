const low = require('lowdb')
const { nanoid } = require("nanoid")
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('data/recipes.json');
const db = low(adapter)

// Set some defaults (required if your JSON file is empty)
db.defaults({recipes: []}).write()

function findAllRecipes(){
    return db.get('recipes').value()
}
function findRecipeId(id){
    return db.get('recipes').find({id}).value()
}
function saveRecipe(recipe){
    const recipeID = {
        id: nanoid(),
        ...recipe,
    }
    db.get('recipes').push(recipeID).write()
    return recipeID;
}
function updateRecipe(id, fields) {
    const recipe = database.get("recipes").find({ id }).value()
    const newRecipe = {
      ...recipe,
      ...fields,
    }
    database.get("recipes").find({ id }).assign(newRecipe).write()
    return newRecipe
  }
  
  function removeRecipe(id) {
    database.get("recipes").remove({ id }).write()
  }

module.exports = {
    findAllRecipes,
    findRecipeId,
    saveRecipe, 
    updateRecipe, 
    removeRecipe
};