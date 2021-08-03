const { Pool } = require('pg')

const pool = new Pool({
    user: 'jacob',
    database: 'wedding_plans',
    password: '',
})

module.exports = pool