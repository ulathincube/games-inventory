import type { Request, Response } from 'express'

function notFound(req: Request, res: Response) {
  res.status(404).json({ message: 'Resource not found!' })
}

export default notFound
