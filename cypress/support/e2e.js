
// Import commands.js using ES2015 syntax:
import './commands'

// Alternatively you can use CommonJS syntax:
// require('./commands')
Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    // if (err.message === 'Uncaught ReferenceError: $ is not defined') 
    return false
})

// Import commands.js using ES2015 syntax:
import './commands';

// расширение для использования xpath
require('cypress-xpath')

// // расширение для использования тегов
// require('cypress-grep')()