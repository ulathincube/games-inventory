import type { Request, Response, NextFunction } from 'express'

function getHomePage(req: Request, res: Response, next: NextFunction) {
  res.json({ message: 'Welcome to the api!' })
}

export { getHomePage }
