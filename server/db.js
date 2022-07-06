// Import path module
const path = require('path')

// Get the location of database.sqlite file
const dbPath = path.resolve(__dirname, 'db/tracker.sqlite')

// Create connection to SQLite database
const knex = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: dbPath,
  },
  useNullAsDefault: true
})

// Create a table in the database called "codes"
knex.schema
  // Make sure no "codes" table exists
  // before trying to create new
  .hasTable('codes')
    .then((exists) => {
      if (!exists) {
        // If no "codes" table exists
        // create new, with "id", "type", "purpose",
        // "creator", "tracking_code", "url" and "created_date" columns
        // and use "id" as a primary identification
        // and increment "id" with every new record (code)
        return knex.schema.createTable('codes', (table)  => {
          table.increments('id').primary()
          table.string('type')
          table.string('purpose')
          table.string('creator')
          table.string('tracking_code')
          table.string('url')
          table.integer('created_date')
        })
        .then(() => {
          // Log success message
          console.log('Table \'Codes\' created')
        })
        .catch((error) => {
          console.error(`There was an error creating table: ${error}`)
        })
      }
    })
    .then(() => {
      // Log success message
      console.log('done')
    })
    .catch((error) => {
      console.error(`There was an error setting up the database: ${error}`)
    })

// Just for debugging purposes:
// Log all data in "codes" table
knex.select('*').from('codes')
  .then(data => console.log('data:', data))
  .catch(err => console.log(err))

// Export the database
module.exports = knex