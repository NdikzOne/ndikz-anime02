import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import Head from 'next/head'
import Header from '@/components/Header'
import Player from '@/components/Player'

export default function WatchEpisode() {
  const router = useRouter()
  const { slug } = router.query
  const [episode, setEpisode] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (slug) {
      const fetchEpisode = async () => {
        try {
          const res = await fetch(`/api/episode?url=https://otakudesu.best/episode/${slug}/`)
          const data = await res.json()
          setEpisode(data)
        } catch (error) {
          console.error('Error fetching episode:', error)
        } finally {
          setLoading(false)
        }
      }

      fetchEpisode()
    }
  }, [slug])

  if (loading) {
    return (
      <div className="loading">
        <div className="btn">Loading...</div>
      </div>
    )
  }

  if (!episode) {
    return (
      <div className="container">
        <h1>Episode not found</h1>
      </div>
    )
  }

  return (
    <>
      <Head>
        <title>{episode.episodeTitle} - AnimeFlix</title>
      </Head>

      <Header />

      <main className="container">
        <h1 style={{ margin: '2rem 0' }}>{episode.episodeTitle}</h1>
        
        <Player url={episode.videoUrl} />

        <div style={{ margin: '2rem 0' }}>
          <h2>Download Links</h2>
          {episode.downloads.map((download, index) => (
            <div key={index} style={{ marginBottom: '1rem' }}>
              <h3>{download.resolution}</h3>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                {download.servers.map((server, i) => (
                  <a
                    key={i}
                    href={server.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn"
                    style={{ marginBottom: '0.5rem' }}
                  >
                    {server.server}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  )
}