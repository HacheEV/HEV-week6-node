const {Router, query} = require('express')
const Service = require('../services/recipe_service');
const validate = require('../middleware/validate.js');

const router = Router();

const isNumber = text => !isNaN(parseInt(text));

router.get('/', (req, res) => {

    if(req.query.keywords && req.query.title){
      const page = parseInt(req.query.page) || 0;
      const size = parseInt(req.query.size) || 10;
      const keywords = req.query.keywords;
      const title = req.query.title;

      
      const recipes = Service.filterAll(
        keywords, 
        title,
        page, 
        size
      );
      res.status(200).json(recipes);
    }
    if(!req.query.keywords && !req.query.title){
        const page = parseInt(req.query.page) || 0;
        const size = parseInt(req.query.size) || 10;
        
        if(!isNumber(page) || page < 0){
          res.status(400).json("Page incorrect");
        }
        if(!isNumber(size) || size < 0){
          res.status(400).json("Size incorrect");
        }
        const recipes = Service.getRecipesPage({
          page, 
          size,
        });
        res.status(200).json(recipes);
    }
    if(req.query.keywords){
      const recipes = Service.filterByKeywords(req.query.keywords);
      res.status(200).json(recipes);
    }
    if(req.query.title){
      const recipes = Service.filterByTitle(req.query.title);
      res.status(200).json(recipes);
    }
  
})

router.get('/:id', (req, res) => {
    
    const recipe = Service.getRecipe(req.params.id);
    res.status(200).json(recipe);
})

<<<<<<< HEAD
router.post('/', validate(Service.validateRecipe), async (req, res) => {
    const recipe = await Service.createRecipe(req.body);
    res.status(201).json(recipe);
})
router.put('/:id', (req, res) => {
    const recipe = Service.recipeById(req.params.id, req.body)
    res.status(201).json(recipe)
})
router.delete('/:id', (req, res) => {
    const removed = Service.removeRecipe(req.params.id);
    if(removed){
        res.status(204).end()
    }else{
        res.status(304).end()
    }
})



=======
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
>>>>>>> hector
module.exports = router;