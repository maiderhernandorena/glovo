const fetch = require('node-fetch');
const { API_URL, API_VERSION, API_KEY } = require('./constants')

const executeRequest = async (path) => {
    try {
        const result = await fetch(`${API_URL}${API_VERSION}${API_KEY}${path}`)
    
        return result.json()
    } catch (error) {
        new Error(err.message)
    }
}

module.exports = {
    executeRequest
}