import Games from './pages/Games'
import HomePage from './pages/HomePage'
import NewGame from './pages/NewGame'
import Game from './pages/Game'
import { Route, Routes } from 'react-router'

function App() {
  return (
    <Routes>
      <Route path="/games/create" element={<NewGame />} />
      <Route path="/games/:gameId" element={<Game />} />
      <Route path="/games" element={<Games />} />
      <Route path="/" element={<HomePage />} />
    </Routes>
  )
}

export default App
