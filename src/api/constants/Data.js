const KEYS = {
    ID: 'idDrink',
    NAME: 'strDrink',
    INGREDIENTS: 'strIngredient',
    MEASURE: 'strMeasure',
    ALCOHOLIC: 'strAlcoholic'
}

const VALUES = {
    ID: 'id',
    NAME: 'name',
    INGREDIENTS: 'ingredients',
    MEASURE: 'quantities',
    ALCOHOLIC: 'alcoholic'
}

const ATTRIBUTES = [
    { key: KEYS.ID, name: VALUES.ID, repeated: false },
    { key: KEYS.NAME, name: VALUES.NAME, repeated: false },
    { key: KEYS.INGREDIENTS, name: VALUES.INGREDIENTS, repeated: true },
]

module.exports = {
    KEYS,
    VALUES,
    ATTRIBUTES
}