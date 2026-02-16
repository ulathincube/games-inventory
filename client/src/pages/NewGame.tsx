import GameForm from '../components/GameForm'
import { apiURL } from '../config/constants'

function NewGame() {
  return (
    <section>
      <GameForm method="POST" url={`${apiURL}/games`} />
    </section>
  )
}

export default NewGame
