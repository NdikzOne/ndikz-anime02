import { useState, useEffect } from 'react'
import Head from 'next/head'
import AnimeCard from '@/components/AnimeCard'
import Header from '@/components/Header'

export default function Home() {
  const [ongoingAnime, setOngoingAnime] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/home')
        const data = await res.json()
        setOngoingAnime(data)
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return (
      <div className="loading">
        <div className="btn">Loading...</div>
      </div>
    )
  }

  return (
    <>
      <Head>
        <title>AnimeFlix - Watch Anime Online</title>
        <meta name="description" content="Watch anime online for free" />
      </Head>

      <Header />

      <main className="container">
        <h1 style={{ margin: '2rem 0' }}>Ongoing Anime</h1>
        <div className="anime-grid">
          {ongoingAnime.map((anime, index) => (
            <AnimeCard
              key={index}
              title={anime.animeTitle}
              image={anime.imageUrl}
              episode={anime.episode}
              link={`/anime/${anime.animePage.split('/').filter(Boolean).pop()}`}
            />
          ))}
        </div>
      </main>

      <footer className="footer">
        <p>© 2023 AnimeFlix - All Rights Reserved</p>
      </footer>
    </>
  )
}