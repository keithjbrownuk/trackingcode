// Import database
const knex = require('./../db')

// Retrieve all codes
exports.codesAll = async (req, res) => {
  // Get all codes from database
  knex
    .select('*') // select all records
    .from('codes') // from 'codes' table
    .then(userData => {
      // Send codes extracted from database in response
      res.json(userData)
    })
    .catch(err => {
      // Send a error message in response
      res.json({ message: `There was an error retrieving codes: ${err}` })
    })
}

// Create new code
exports.codesCreate = async (req, res) => {
  // Add new code to database
  knex('codes')
    .insert({ // insert new record, a code
      'type': req.body.type,
      'purpose': req.body.purpose,
      'creator': req.body.creator,
      'tracking_code': req.body.tracking_code,
      'url': req.body.url,
      'created_date': Date.now()
    })
    .then(() => {
      // Send a success message in response
      res.json({ message: `Code \'${req.body.tracking_code}\' by ${req.body.creator} added.` })
    })
    .catch(err => {
      // Send a error message in response
      res.json({ message: `There was an error creating ${req.body.tracking_code} code: ${err}` })
    })
}

// Remove specific code
exports.codesDelete = async (req, res) => {
  // Find specific code in the database and remove it
  knex('codes')
    .where('id', req.body.id) // find correct record based on id
    .del() // delete the record
    .then(() => {
      // Send a success message in response
      res.json({ message: `code ${req.body.id} deleted.` })
    })
    .catch(err => {
      // Send a error message in response
      res.json({ message: `There was an error deleting ${req.body.id} code: ${err}` })
    })
}

// Remove all codes on the list
exports.codesReset = async (req, res) => {
  // Remove all codes from database
  knex
    .select('*') // select all records
    .from('codes') // from 'codes' table
    .truncate() // remove the selection
    .then(() => {
      // Send a success message in response
      res.json({ message: 'Tracking Code list cleared.' })
    })
    .catch(err => {
      // Send a error message in response
      res.json({ message: `There was an error resetting Code list: ${err}.` })
    })
}