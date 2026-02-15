import type { Response, Request, NextFunction } from 'express'

function errorHandler(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  console.log(error.message, error.name)
  res.json({ error: error.message, data: null })
}

export default errorHandler
