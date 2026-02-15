import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router'
import GameForm from '../components/GameForm'
import styles from './Game.module.css'

interface GameObject {
  title: string
  sales: number
  developer_name: string
  genre_name: string
  release_date: string
}

function Game() {
  const { gameId } = useParams()
  const [gameData, setGameData] = useState<GameObject | null>(null)
  const [update, setUpdate] = useState<boolean>(false)

  const navigate = useNavigate()

  const deleteGameHandler = (gameId: number) => {
    const deleteGame = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/games/${gameId}`,
          {
            method: 'DELETE',
          }
        )
        if (response.ok) return navigate('/')
        // const data = await response.json()
      } catch (error) {
        if (error instanceof Error) throw error
      }
    }

    deleteGame()
  }

  const onButtonClick = () => {
    if (!gameData) return
    const response = confirm(
      `Are you sure you want to delete ${gameData.title} from the database?`
    )
    if (!response) return
    if (gameId) {
      deleteGameHandler(parseInt(gameId))
    }
  }

  useEffect(() => {
    const getGameData = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/games/${gameId}`
        )

        const data = await response.json()
        setGameData(data)
      } catch (error) {
        if (error instanceof Error) throw error
      }
    }

    getGameData()
  }, [gameId])

  if (!gameData)
    return (
      <section>
        <p>...Loading...</p>
      </section>
    )

  const humanReadableDate = new Date(gameData.release_date).toDateString()
  const humanReadableSales = new Intl.NumberFormat('de-DE').format(
    gameData.sales
  )
  return (
    <section>
      <h1 className={styles.primary}>{gameData.title}</h1>

      <dl className={styles.info}>
        <div className={styles['info-group']}>
          <dt className={styles.label}>Developer</dt>
          <dd>{gameData.developer_name}</dd>
        </div>

        <div className={styles['info-group']}>
          <dt className={styles.label}>Genre</dt>
          <dd>{gameData.genre_name}</dd>
        </div>

        <div className={styles['info-group']}>
          <dt className={styles.label}>Total Copies Sold</dt>
          <dd>{humanReadableSales}</dd>
        </div>

        <div className={styles['info-group']}>
          <dt className={styles.label}>Release Date</dt>
          <dd>{humanReadableDate}</dd>
        </div>

        <div className={styles.buttons}>
          <button
            className={styles['alternate-button']}
            onClick={() => setUpdate(!update)}
          >
            Update Data
          </button>
          <button className={styles['primary-button']} onClick={onButtonClick}>
            Delete Game
          </button>
        </div>
      </dl>

      {update && (
        <GameForm
          url={`http://localhost:5000/api/games/${gameId}`}
          method="PUT"
        />
      )}
    </section>
  )
}

export default Game
