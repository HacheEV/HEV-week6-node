const express = require('express')
const recipeController = require('./controllers/recipe_controller');

const app = express()
const port = process.env.PORT || 8000

app.use(express.json()) 
app.use('/recipes', recipeController);

app.listen(port, () => console.log(`Listening on http://localhost:${port}`))