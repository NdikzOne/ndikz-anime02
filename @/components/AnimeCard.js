import Link from 'next/link'

export default function AnimeCard({ title, image, episode, link }) {
  return (
    <Link href={link}>
      <div className="anime-card">
        <img src={image} alt={title} />
        <div className="anime-info">
          <h3 className="anime-title">{title}</h3>
          <p className="anime-episode">{episode}</p>
        </div>
      </div>
    </Link>
  )
}
