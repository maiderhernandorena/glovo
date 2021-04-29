const API =  require('./api')

API.getCocktailsStartingWithLetter().then(drinks => {
    const cocktailsWithMinimumIngredients = API.getCocktailsWithMinimumIngredientsQuantity(drinks)
    const cocktailsWithIngredients = API.getCocktailsWithIngredients(cocktailsWithMinimumIngredients)
    const cocktailsWithIngredientsQuantities = API.getCocktailsWithIngredientQuantities(drinks, cocktailsWithIngredients)

    return API.getCocktailsGroupedByAlcoholic(drinks, cocktailsWithIngredientsQuantities)
})