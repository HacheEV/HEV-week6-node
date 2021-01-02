const {Router} = require('express')
const {getAllRecipes, getRecipe, getRecipePage} = require('../services/recipe_service');
const validate = require('../middleware/validate.js');
const pagination = require('../middleware/pagination.js');
const {validateRecipe} = require('../services/recipe_service');
const {createRecipe} = require('../services/recipe_service');
const router = Router();

router.get('/', pagination, async (req, res) => {
    if(req.query.page){
        const recipes = await getRecipePage(req.query);
        res.status(200).json(recipes);
    }else{
        const recipes = getAllRecipes();
        res.status(200).json(recipes);
    }
  
})
router.get('/:id', async (req, res) => {
    
    const recipe = await getRecipe(req.params.id);
    res.status(200).json(recipe);
})

router.post('/', validate(validateRecipe), (req, res) => {
    
    const recipe = createRecipe(req.body);
    res.status(201).json(recipe);
})

module.exports = router;