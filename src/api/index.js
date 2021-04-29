const Service = require('./Service')
const Utils = require('./Utils')
const { KEYS, VALUES, ATTRIBUTES } = require('./constants')

const getCocktailsStartingWithLetter = async (letter = 'g') => {
    const cocktails = await Service.executeRequest(`search.php?f=${letter}`)

    if (cocktails) {
        const { drinks } = cocktails
        const cocktailsNames = Utils.getProperties(drinks, 'strDrink')

        console.log(`Cocktails beginning with ${letter.toUpperCase()}:`)
        console.log(`Total: ${drinks.length}`)
        console.log(`Names: ${cocktailsNames.join(', ')}`)

        return drinks
    }

    new Error('There was no cocktails, try again! :(')
}

const getCocktailsWithMinimumIngredientsQuantity = (drinks = [], qty = '4') => {
    const minimumIngredientsCocktails = Utils.filterPropertyByQuantity(drinks, 'strIngredient', qty)
    const cocktailsNames = Utils.getProperties(minimumIngredientsCocktails, 'strDrink')

    console.log(`Cocktails with more than ${qty} ingredients:`)
    console.log(`Total: ${minimumIngredientsCocktails.length}`)
    console.log(`Names: ${cocktailsNames.join(', ')}`)

    return minimumIngredientsCocktails
}

const getCocktailsWithIngredients = (drinks = []) => {
    const attributesNames = Utils.getProperties(ATTRIBUTES, 'name')
    const cocktails = Utils.getFilteredData(drinks, ATTRIBUTES)

    console.log(`Cocktails with just ${attributesNames.join('/')}:`)
    cocktails.map(cocktail => console.log(cocktail))

    return cocktails
}

const getCocktailsWithIngredientQuantities = (drinks, cocktailsWithIngredients) => {
    const cocktails = cocktailsWithIngredients.map(i => {
        const drink = drinks.find(({ idDrink }) => idDrink === i.id)

        i[VALUES.INGREDIENTS] = i[VALUES.INGREDIENTS].map((ingredient, index)=> {
            return {
                name: ingredient,
                quantity: drink[`${KEYS.MEASURE}${index + 1}`]
            }
        })

        return i
    })

    console.log(`Cocktails with ${VALUES.INGREDIENTS} ${VALUES.MEASURE}:`)
    cocktails.map(cocktail => console.log(cocktail))

    return cocktails
}

const getCocktailsGroupedByAlcoholic = (drinks, cocktailsWithIngredients) => {
    const cocktails = cocktailsWithIngredients.map(i => {
        const drink = drinks.find(({ idDrink }) => idDrink === i.id)

        return { ...i, [VALUES.ALCOHOLIC]: drink[KEYS.ALCOHOLIC] }
    })

    const sections = Utils.groupByKey(cocktails, VALUES.ALCOHOLIC)

    console.log('Alcoholic / Non-alcoholic cocktails:')
    console.log(sections)
}

module.exports = {
    getCocktailsStartingWithLetter,
    getCocktailsWithMinimumIngredientsQuantity,
    getCocktailsWithIngredients,
    getCocktailsWithIngredientQuantities,
    getCocktailsGroupedByAlcoholic
}