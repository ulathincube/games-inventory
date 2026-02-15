import { Router } from 'express'
import {
  getAllGames,
  getGame,
  postGame,
  postGenre,
  postDeveloper,
  deleteGame,
  updateGame,
  getAllGenres,
} from '../controllers/games.js'

const router = Router()

router.get('/genre', getAllGenres)
router.post('/genre', postGenre)

router.post('/developer', postDeveloper)

router.put('/:gameId', updateGame)
router.get('/:gameId', getGame)
router.delete('/:gameId', deleteGame)

router.post('/', postGame)
router.get('/', getAllGames)

export default router
