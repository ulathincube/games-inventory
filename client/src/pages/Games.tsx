import { useState, useEffect } from 'react'
import { Link } from 'react-router'
import styles from './Games.module.css'
import { apiURL } from '../config/constants'

function Games() {
  const [games, setGames] = useState<[]>([])
  useEffect(() => {
    console.log(`${apiURL}/games`)
    const getAllGames = async () => {
      const response = await fetch(`${apiURL}/games`)
      if (!response.ok) throw new Error('Invalid response! : Error encountered')

      const data = await response.json()
      setGames(data)
    }

    getAllGames()
  }, [])

  if (games.length === 0)
    return (
      <section>
        <h1 className={styles.primary}>All Games</h1>
        <p className={styles.loader}>...Loading games data...</p>
      </section>
    )

  const gamesData = games.map(
    ({ title, game_id: gameId }: { title: string; game_id: number }) => (
      <li className={styles.list} key={gameId}>
        <Link className={styles.game} to={`/games/${gameId}`}>
          {title}
        </Link>
      </li>
    )
  )

  return (
    <section>
      <h1>All Games</h1>
      <ul>{gamesData}</ul>
      <Link className={styles.add} to="/games/create">
        Add A New Game
      </Link>
    </section>
  )
}

export default Games
