const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('data/recipes.json');
const db = low(adapter)

// Set some defaults (required if your JSON file is empty)
db.defaults({recipes: []}).write()

function findAllRecipes(){
    return db.get('recipes').value()
}
function findRecipeId(id){
    return db.get('recipes').find({id: Number(id)}).value()
}
function saveRecipe(recipe){
    db.get('recipes').push(recipe).write()
    return recipe;
}

module.exports = {
    findAllRecipes,
    findRecipeId,
    saveRecipe
};