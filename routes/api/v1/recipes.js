const recipes = require('../../../data/recipes.json')
const router = require('express').Router()

router.get('/', (_, response) => {
    const results = []
    recipes.forEach((recipe, index) => {
        const { id, title, image, prepTime, difficulty } = recipe
        results.push({ id, title, image, prepTime, difficulty })
    })
    response.send(results)
})

router.get('/recipe/:id', (request, response) => {
    const { id } = request.params
    const found = recipes.find(r => r.id === parseInt(id))
    if (found) response.send(found)
        else response.send({ error: { message: `Could not find recipe with id : ${id}` } })
})

router.post('/recipe/add', (request, response) => {
    const { title, image, description, ingredients, instructions, prepTime, difficulty } = request.body
    const newRecipe = {
        id: recipes.length + 1,
        title: title,
        image: image,
        description: description,
        ingredients: ingredients,
        instructions: instructions,
        prepTime: prepTime,
        difficulty: difficulty
    }
    const found = recipes.find(r => r.title === title)
    if (found) return response.status(409).send({ error: { message: `Recipe with title: ${title} already exists` } })
    else
    {
        recipes.push(newRecipe)
        response.status(201).send(newRecipe)
    }
})

module.exports = router