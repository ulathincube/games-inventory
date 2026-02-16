import React, { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router'
import styles from './GameForm.module.css'
import { apiURL } from '../config/constants'

interface GameProps {
  method: string
  url: string
}

function GameForm({ method = 'POST', url = `${apiURL}/games` }: GameProps) {
  const [error, setError] = useState<null | string>(null)
  const [genreData, setGenreData] = useState<null | []>(null)
  const navigate = useNavigate()

  useEffect(() => {
    const getGenres = async () => {
      try {
        const response = await fetch(`${apiURL}/games/genre`)
        if (!response.ok) throw new Error('Failed to make a request!')
        const data = await response.json()
        const allGenres = data.map(
          (genre: { genre_name: string }) => genre.genre_name
        )
        setGenreData(allGenres)
      } catch (error) {
        if (error instanceof Error) setError(error.message)
      }
    }

    getGenres()
  }, [])

  const titleRef = useRef<HTMLInputElement>(null)
  const developerRef = useRef<HTMLInputElement>(null)
  const genreRef = useRef<HTMLSelectElement>(null)
  const salesRef = useRef<HTMLInputElement>(null)
  const releaseDateRef = useRef<HTMLInputElement>(null)

  const formSubmitHandler = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault()

    const userData = {
      title: titleRef?.current?.value,
      developer: developerRef?.current?.value,
      genre: genreRef?.current?.value,
      sales: salesRef?.current?.value,
      release_date: releaseDateRef?.current?.value,
    }
    console.log(userData)

    const postGameData = async (method: string) => {
      try {
        const response = await fetch(url, {
          method: `${method}`,
          body: JSON.stringify(userData),
          headers: {
            'Content-Type': 'application/json',
          },
        })

        if (!response.ok) throw new Error('Failed to make a post request')
        const data = await response.json()

        if (!data.error) return navigate('/')
        throw new Error(data.error)
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message)
          setTimeout(() => setError(null), 5000)
        }
      }
    }

    postGameData(method)
  }

  return (
    <>
      {error && <span className={styles.error}>{error}</span>}
      {genreData && (
        <form className={styles.form} onSubmit={formSubmitHandler}>
          <div className={styles['form-group']}>
            <label htmlFor="title">Title</label>
            <input
              ref={titleRef}
              type="text"
              id="title"
              name="title"
              placeholder="Title"
            />
          </div>
          <div className={styles['form-group']}>
            <label htmlFor="developer">Developer</label>
            <input
              ref={developerRef}
              type="text"
              id="developer"
              name="developer"
              placeholder="Developer"
            />
          </div>
          <div className={styles['form-group']}>
            <label htmlFor="genre">Genre</label>
            <select ref={genreRef} id="genre">
              {genreData?.map((genre: string) => (
                <option key={genre} value={genre}>
                  {genre}
                </option>
              ))}
            </select>
          </div>
          <div className={styles['form-group']}>
            <label htmlFor="sales">Sales</label>
            <input
              min="0"
              step="1"
              ref={salesRef}
              type="number"
              id="sales"
              name="sales"
              placeholder="0"
            />
          </div>
          <div className={styles['form-group']}>
            <label htmlFor="release_date">Release Date</label>
            <input
              ref={releaseDateRef}
              type="date"
              id="release_date"
              name="release_date"
              placeholder="Release Date"
            />
          </div>

          <div className={styles['form-group']}>
            <button className={styles['primary-button']} type="submit">
              {method === 'POST' ? 'Add Game' : 'Update Game'}
            </button>
          </div>
        </form>
      )}
    </>
  )
}

export default GameForm
