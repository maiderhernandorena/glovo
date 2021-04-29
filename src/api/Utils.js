const getProperties = (data = [], key = 'name') => {
    return data.map(each => each[key])
}

const filterPropertyByQuantity = (data = [], key = 'name', qty = '1') => {
    return data.filter((item) => {
        const qtyLimitKey = `${key}${qty}`

        return !!item[qtyLimitKey]
    })
}

const isValidValue = (obj, property, key) => {
    return (obj.hasOwnProperty(property) && property.toString().startsWith(key) && obj[property])
}

const findValuesByPrefix = (obj, key) => {
    const values = []

    for (var property in obj) {
      if (isValidValue(obj, property, key)) {
        values.push(obj[property])
      }
    }

    return values
}

const updateObjectProperty = (obj, key, newValue) => {
    return { ...obj, [key]: newValue }
}

const getFilteredData = (data = [], attributes = []) => {
    return data.map(e => {
        let item = {}

        attributes.map(i => {
            const value = i.repeated ? findValuesByPrefix(e, i.key) : e[i.key]

            item = updateObjectProperty(item, i.name, value)
        })

        return item
    })
}

const groupByKey = (array = [], key = 'id') => {
    return array.reduce((acum, obj) => {
        acum[obj[key]] = acum[obj[key]] || [];
        acum[obj[key]].push(obj);
        
        return acum;
    }, Object.create({}))
}

module.exports = {
    getProperties,
    filterPropertyByQuantity,
    getFilteredData,
    groupByKey
}