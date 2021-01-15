const {Router, query} = require('express')
const Service = require('../services/recipe_service');
const validate = require('../middleware/validate.js');

const router = Router();

router.get('/', (req, res) => {

    if(!req.query.keywords && !req.query.title){
        const recipes = Service.getAllRecipes();
        res.status(200).json(recipes);
    }
    if(req.query.keywords){
      const recipes = Service.filterByKeywords(req.query.keywords);
      res.status(200).json(recipes);
    }
    if(req.query.title){
      const recipes = Service.filterByTitle(req.query.title);
      res.status(200).json(recipes);
        
    }else{
      return res.status(400).json("Sorry something was wrong")
    }
  
})
router.get('/:id', (req, res) => {
    
    const recipe = Service.getRecipe(req.params.id);
    res.status(200).json(recipe);
})

router.post('/', validate(Service.validateRecipe), (req, res) => {
    
    const recipe = Service.createRecipe(req.body);
    res.status(201).json(recipe);
})
router.put("/:id", (req, res) => {
  const recipe = Service.putRecipe(req.params.id, req.body)
  res.status(201).json(recipe)
})
router.delete("/:id", (req, res) => {
  const removed = Service.removeRecipe(req.params.id)
  if (removed) {
    res.status(204).end()
  } else {
    res.status(304).end()
  }
})
module.exports = router;