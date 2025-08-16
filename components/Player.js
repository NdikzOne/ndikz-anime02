export default function Player({ url }) {
  return (
    <div className="player-container">
      <div className="player-wrapper">
        <iframe
          src={url}
          className="player-iframe"
          allowFullScreen
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        ></iframe>
      </div>
    </div>
  )
}