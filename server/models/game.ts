import pool from '../config/pool.js'
import CustomError from '../errors/CustomError.js'

interface GameData {
  title: string
  developer: string
  genre: string
  sales: number
  release_date: string
}

async function getAllGamesDB() {
  try {
    const allGames = await pool.query('SELECT * FROM games')
    return allGames.rows
  } catch (error) {
    if (error instanceof Error) throw error
  }
}

async function getGameDB(gameId: number) {
  try {
    const game = await pool.query(
      'SELECT * FROM games INNER JOIN developers USING (developer_id) INNER JOIN genres USING (genre_id) WHERE game_id = $1',
      [gameId],
    )
    return game.rows[0]
  } catch (error) {
    if (error instanceof Error) throw error
  }
}

async function getGamesByGenreDB(genre: string) {
  try {
    const gamesListGenre = await pool.query(
      'SELECT * FROM games  INNER JOIN genres USING (genre_id) WHERE genre_name = $1',
      [genre],
    )

    return gamesListGenre.rows
  } catch (error) {
    if (error instanceof Error) throw error
  }
}

async function getGamesByDeveloperDB(developer: string) {
  try {
    const gamesListDeveloper = await pool.query(
      'SELECT * FROM games INNER JOIN developers USING (developer_id) WHERE developer_name = $1',
      [developer],
    )

    return gamesListDeveloper.rows
  } catch (error) {
    if (error instanceof Error) throw error
  }
}

async function postGameDB(gameData: GameData) {
  const { title, developer, genre, sales, release_date } = gameData

  let genreId: number | null, developerId: number | null
  try {
    const developerData = await pool.query(
      'SELECT developer_id FROM developers WHERE developer_name = $1',
      [developer],
    )

    if (!developerData.rows[0]) {
      // create developer

      throw new CustomError(
        400,
        'This developer does not exist in the database. Please include the developer creation date to add the developer to the database',
      )

      // const newDeveloper = await pool.query(
      //   'INSERT INTO developer (developer_name) VALUES ($1) RETURNING developer_id',
      //   [developer],
      // )
      // developerId = newDeveloper.rows[0].developer_id
    }
    developerId = developerData.rows[0].developer_id

    const genreData = await pool.query(
      'SELECT genre_id FROM genres WHERE genre_name = $1',
      [genre],
    )

    if (!genreData.rows[0]) {
      throw new CustomError(
        400,
        'This genre does not exist in the database. Please include the genre first to the list of game genres',
      )
      // const newGenre = await pool.query(
      //   'INSERT INTO genre (genre_name) VALUES ($1) RETURN genre_id',
      //   [genre],
      // )

      // genreId = genreData.rows[0].genre_id
    }
    genreId = genreData.rows[0].genre_id

    const insertedData = await pool.query(
      'INSERT INTO games (title, developer_id, genre_id, sales, release_date) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [title, developerId, genreId, sales, release_date],
    )

    return insertedData
  } catch (error) {
    if (error instanceof Error) throw error
  }
}

async function postDeveloperDB(developerName: string, creationDate: string) {
  try {
    const developer = await pool.query(
      'INSERT INTO developers (developer_name, creation_date) VALUES ($1, $2) RETURNING *',
      [developerName, creationDate],
    )
    return developer.rows[0]
  } catch (error: any) {
    if (error instanceof Error) throw error
  }
}

async function postGenreDB(genre: string) {
  try {
    const genreData = await pool.query(
      'INSERT INTO genres (genre_name) VALUES ($1)',
      [genre],
    )
    return genreData.rows[0]
  } catch (error: any) {
    if (error instanceof Error) throw error
  }
}

async function updateGameDB(gameData: GameData, gameId: number) {
  const { title, developer, genre, sales, release_date } = gameData
  try {
    const developerData = await pool.query(
      'SELECT developer_id FROM developers WHERE developer_name = $1',
      [developer],
    )

    const developerId = developerData.rows[0].developer_id

    if (!developerId)
      throw new CustomError(404, 'Developer could not be found!')

    const genreData = await pool.query(
      'SELECT genre_id FROM genres WHERE genre_name = $1',
      [genre],
    )

    const genreId = genreData.rows[0].genre_id

    if (!genreId) throw new CustomError(404, 'This genre could not be found!')

    const updatedGame = await pool.query(
      'UPDATE games SET title = $1, sales = $2, release_date = $3, developer_id = $4, genre_id = $5 WHERE game_id = $6 RETURNING *',
      [title, sales, release_date, developerId, genreId, gameId],
    )

    console.log({
      developerId,
      title,
      sales,
      release_date,
      genreId,
      gameId,

      updatedGame: updatedGame?.rows,
    })

    return updateGameDB
  } catch (error: any) {
    if (error instanceof Error) throw error
  }
}

async function updateGenreDB(genre: string, genreId: number) {
  try {
    const newGenre = await pool.query(
      'UPDATE genres SET genre_name = $1 WHERE genre_id = $2 RETURNING *',
      [genre, genreId],
    )

    return newGenre
  } catch (error: any) {
    if (error instanceof Error) throw error
  }
}

async function updateDeveloperDB(
  developerName: string,
  creationDate: string,
  developerId: number,
) {
  try {
    const newGenre = await pool.query(
      'UPDATE developers SET developer_name = $1, creation_date = $2 WHERE developer_id = $3 RETURNING *',
      [developerName, creationDate, developerId],
    )

    return newGenre
  } catch (error: any) {
    if (error instanceof Error) throw error
  }
}

async function deleteGameDB(gameId: number) {
  try {
    const deletedGame = await pool.query(
      'DELETE FROM games WHERE game_id = $1 RETURNING *',
      [gameId],
    )

    return deletedGame
  } catch (error: any) {
    if (error instanceof Error) throw error
  }
}

async function getAllGenresDB() {
  try {
    const allGenres = await pool.query('SELECT genre_name FROM genres')
    return allGenres.rows
  } catch (error: any) {
    if (error instanceof Error) throw error
  }
}

export {
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
}
