const express = require('express')
const cors = require('cors')
require('express-async-errors')
const recipeController = require('./controllers/recipe_controller');

const app = express()
const port = process.env.PORT || 8000

app.use(cors({
    origin: 'https://nuclio-recipes.herokuapp.com/',
    optionsSuccessStatus: 200 
}))
app.use(express.json()) 
app.use('/recipes', recipeController);

app.listen(port, () => console.log(`Listening on http://localhost:${port}`))