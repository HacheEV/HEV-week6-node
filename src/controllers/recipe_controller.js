const {Router} = require('express')
const {getAllRecipes, getRecipe, getRecipePage,validateRecipe, createRecipe, removeRecipe} = require('../services/recipe_service');
const validate = require('../middleware/validate.js');
const pagination = require('../middleware/pagination.js');

const router = Router();

router.get('/', pagination, (req, res) => {
    if(req.query.page){
        const recipes = getRecipePage(req.query);
        res.status(200).json(recipes);
    }else{
        const recipes = getAllRecipes();
        res.status(200).json(recipes);
    }
  
})
router.get('/:id', (req, res) => {
    
    const recipe = getRecipe(req.params.id);
    res.status(200).json(recipe);
})

router.post('/', validate(validateRecipe), (req, res) => {
    
    const recipe = createRecipe(req.body);
    res.status(201).json(recipe);
})
router.put("/:id", (req, res) => {
  const recipe = updateRecipe(req.params.id, req.body)
  res.status(201).json(recipe)
})
router.delete("/:id", (req, res) => {
  const removed = removeRecipe(req.params.id)
  if (removed) {
    res.status(204).end()
  } else {
    res.status(304).end()
  }
})
module.exports = router;