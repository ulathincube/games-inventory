import { Pool, Client } from 'pg'
import { DATABASE_URI } from './constants.js'

const pool = new Pool({
  connectionString: DATABASE_URI,
})

export default pool
