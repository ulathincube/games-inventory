import type { Response, Request, NextFunction } from 'express'
import {
  getAllGamesDB,
  getGameDB,
  getGamesByGenreDB,
  getGamesByDeveloperDB,
  postGameDB,
  postDeveloperDB,
  postGenreDB,
  updateDeveloperDB,
  updateGameDB,
  updateGenreDB,
  deleteGameDB,
  getAllGenresDB,
} from '../models/game.js'

async function getAllGames(req: Request, res: Response, next: NextFunction) {
  const { genre, developer } = req.query

  try {
    if (genre && typeof genre === 'string') {
      const gamesByGenre = await getGamesByGenreDB(genre)
      return res.status(200).json(gamesByGenre)
    }

    if (developer && typeof developer === 'string') {
      const gamesByDeveloper = await getGamesByDeveloperDB(developer)
      return res.status(200).json(gamesByDeveloper)
    }

    const allGames = await getAllGamesDB()
    if (allGames) return res.status(200).json(allGames)
    res.status(404).json({ message: 'Failed to get games data!' })
  } catch (error) {
    if (error instanceof Error) next(error)
  }
}

async function getGame(req: Request, res: Response, next: NextFunction) {
  const { gameId } = req.params
  if (gameId === undefined || typeof gameId !== 'string') return
  const numericalGameId = parseInt(gameId)

  if (Number.isNaN(numericalGameId)) return

  try {
    const game = await getGameDB(numericalGameId)
    if (game) return res.status(200).json(game)
    return res.status(404).json({ message: 'Game not found!' })
  } catch (error) {
    if (error instanceof Error) next(error)
  }
}

async function postGame(req: Request, res: Response, next: NextFunction) {
  try {
    const { title, release_date, developer, genre, sales } = req.body

    const addedGame = await postGameDB({
      title,
      release_date,
      developer,
      genre,
      sales,
    })

    res.status(201).json(addedGame)
  } catch (error) {
    if (error instanceof Error) throw error
  }
}

async function postGenre(req: Request, res: Response, next: NextFunction) {
  const { genre } = req.body
  try {
    if (genre && typeof genre === 'string') {
      await postGenreDB(genre)
      return res.status(201).json({ message: 'Uploaded a new game genre' })
    }
  } catch (error: any) {
    if (error instanceof Error) next(error)
  }
}

async function postDeveloper(req: Request, res: Response, next: NextFunction) {
  try {
    const { developer_name, creation_date } = req.body

    if (developer_name && creation_date) {
      const newDeveloper = await postDeveloperDB(developer_name, creation_date)
      return res
        .status(201)
        .json({ message: 'Uploaded a new developer', newDeveloper })
    }

    res.status(400).json({ message: 'Please provide valid form data!' })
  } catch (error: any) {
    if (error instanceof Error) next(error)
  }
}

async function updateGame(req: Request, res: Response, next: NextFunction) {
  const { title, release_date, developer, genre, sales } = req.body
  const { gameId } = req.params

  if (!gameId && typeof gameId !== 'string') return

  const updatedGame = await updateGameDB(
    {
      title,
      release_date,
      developer,
      genre,
      sales,
    },
    Number(gameId),
  )

  res.status(201).json({ message: 'Updated file!' })

  try {
  } catch (error) {
    if (error instanceof Error) throw error
  }
}

async function updateGenre(req: Request, res: Response, next: NextFunction) {
  const { genre, genreId } = req.body
  try {
    const updatedGenre = await updateGenreDB(genre, genreId)
    res.status(201).json({ message: 'Updated genre' })
  } catch (error: any) {
    if (error instanceof Error) throw error
  }
}

async function updateDeveloper(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { developerName, creation_date, developerId } = req.body
  try {
    const updatedDeveloper = await updateDeveloperDB(
      developerName,
      creation_date,
      developerId,
    )
  } catch (error: any) {
    if (error instanceof Error) throw error
  }
}

async function deleteGame(req: Request, res: Response, next: NextFunction) {
  const { gameId } = req.params
  try {
    if (gameId && typeof Number(gameId) === 'number') {
      const deletedGame = await deleteGameDB(Number(gameId))
    }
    res.status(204).json({ message: 'Game successfully deleted!' })
  } catch (error: any) {
    if (error instanceof Error) next(error)
  }
}

async function getAllGenres(req: Request, res: Response, next: NextFunction) {
  try {
    const allGenres = await getAllGenresDB()
    res.status(200).json(allGenres)
  } catch (error: any) {
    if (error instanceof Error) next(error)
  }
}

export {
  getAllGames,
  getGame,
  postGame,
  postGenre,
  postDeveloper,
  updateGenre,
  updateDeveloper,
  updateGame,
  deleteGame,
  getAllGenres,
}
