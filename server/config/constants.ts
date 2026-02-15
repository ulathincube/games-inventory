import 'dotenv/config'

const PORT = Number(process.env.PORT)
const DATABASE_URI = process.env.DATABASE_URI

export { PORT, DATABASE_URI }
