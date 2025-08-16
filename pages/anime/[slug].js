import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import Head from 'next/head'
import Header from '@/components/Header'

export default function AnimeDetail() {
  const router = useRouter()
  const { slug } = router.query
  const [anime, setAnime] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (slug) {
      const fetchAnimeDetails = async () => {
        try {
          const res = await fetch(`/api/anime?url=https://otakudesu.best/anime/${slug}/`)
          const data = await res.json()
          setAnime(data)
        } catch (error) {
          console.error('Error fetching anime details:', error)
        } finally {
          setLoading(false)
        }
      }

      fetchAnimeDetails()
    }
  }, [slug])

  if (loading) {
    return (
      <div className="loading">
        <div className="btn">Loading...</div>
      </div>
    )
  }

  if (!anime) {
    return (
      <div className="container">
        <h1>Anime not found</h1>
      </div>
    )
  }

  return (
    <>
      <Head>
        <title>{anime.title} - AnimeFlix</title>
      </Head>

      <Header />

      <main className="container">
        <div style={{ display: 'flex', gap: '2rem', margin: '2rem 0' }}>
          <img
            src={anime.details['Thumbnail'] || '/images/default-thumbnail.jpg'}
            alt={anime.title}
            style={{ width: '200px', borderRadius: '8px' }}
          />
          <div>
            <h1>{anime.title}</h1>
            <div style={{ margin: '1rem 0' }}>
              {Object.entries(anime.details).map(([key, value]) => (
                <p key={key}>
                  <strong>{key}:</strong> {value}
                </p>
              ))}
            </div>
          </div>
        </div>

        <div style={{ margin: '2rem 0' }}>
          <h2>Synopsis</h2>
          <p style={{ marginTop: '1rem', lineHeight: '1.6' }}>{anime.synopsis}</p>
        </div>

        <div className="episode-list">
          <h2>Episodes</h2>
          {anime.episodes.map((episode, index) => (
            <Link
              href={`/watch/${episode.episodeUrl.split('/').filter(Boolean).pop()}`}
              key={index}
              className="episode-item"
            >
              <span>{episode.episodeTitle}</span>
              <span className="btn">Watch</span>
            </Link>
          ))}
        </div>
      </main>
    </>
  )
}