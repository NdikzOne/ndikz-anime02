import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import Head from 'next/head'
import AnimeCard from '@/components/AnimeCard'
import Header from '@/components/Header'

export default function Search() {
  const router = useRouter()
  const { q } = router.query
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (q) {
      const fetchSearchResults = async () => {
        setLoading(true)
        try {
          const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`)
          const data = await res.json()
          setResults(data)
        } catch (error) {
          console.error('Error fetching search results:', error)
        } finally {
          setLoading(false)
        }
      }

      fetchSearchResults()
    }
  }, [q])

  return (
    <>
      <Head>
        <title>Search: {q} - AnimeFlix</title>
      </Head>

      <Header />

      <main className="container">
        <h1 style={{ margin: '2rem 0' }}>
          Search Results for: {q}
        </h1>

        {loading ? (
          <div className="loading">
            <div className="btn">Searching...</div>
          </div>
        ) : results.length > 0 ? (
          <div className="anime-grid">
            {results.map((anime, index) => (
              <AnimeCard
                key={index}
                title={anime.title}
                image={anime.image}
                episode={anime.status}
                link={`/anime/${anime.link.split('/').filter(Boolean).pop()}`}
              />
            ))}
          </div>
        ) : (
          <p>No results found for "{q}"</p>
        )}
      </main>
    </>
  )
}