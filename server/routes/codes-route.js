// Import express
const express = require('express')

// Import codes-controller
const codesRoutes = require('../controllers/codes-controller.js')

// Create router
const router = express.Router()

// Add route for GET request to retrieve all codes
// In server.js, codes route is specified as '/codes'
// this means that '/all' translates to '/codes/all'
router.get('/all', codesRoutes.codesAll)

// Add route for POST request to create new code
// In server.js, codes route is specified as '/codes'
// this means that '/create' translates to '/codes/create'
router.post('/create', codesRoutes.codesCreate)

// Add route for PUT request to delete specific code
// In server.js, codes route is specified as '/codes'
// this means that '/delete' translates to '/codes/delete'
router.put('/delete', codesRoutes.codesDelete)

// Add route for PUT request to reset codeshelf list
// In server.js, codes route is specified as '/codes'
// this means that '/reset' translates to '/codes/reset'
router.put('/reset', codesRoutes.codesReset)

// Export router
module.exports = router