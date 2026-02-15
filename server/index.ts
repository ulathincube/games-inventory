import app from './app.js'
import { PORT } from './config/constants.js'

app.listen(PORT, (error: any) => {
  if (error instanceof Error) throw error
  console.log(`Server is running on port: ${PORT}`)
})
