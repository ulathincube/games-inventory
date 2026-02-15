import GameForm from '../components/GameForm'

function NewGame() {
  return (
    <section>
      <GameForm method="POST" url="http://localhost:5000/api/games" />
    </section>
  )
}

export default NewGame
