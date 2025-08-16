import axios from 'axios'
import * as cheerio from 'cheerio'

export default async function handler(req, res) {
  const { url } = req.query

  if (!url) {
    return res.status(400).json({ error: 'URL is required' })
  }

  try {
    const { data } = await axios.get(url, {
      headers: { 'User-Agent': 'Mozilla/5.0' }
    })

    const $ = cheerio.load(data)

    // Judul episode
    const episodeTitle = $('.jdlrx h1').text().trim()

    // Link streaming (iframe)
    const videoUrl = $('iframe').attr('src')

    // Daftar link download
    const downloads = []
    $('.download ul li').each((i, el) => {
      const resolution = $(el).find('strong').text().trim()
      const servers = []
      $(el).find('a').each((j, a) => {
        servers.push({
          server: $(a).text().trim(),
          url: $(a).attr('href')
        })
      })
      downloads.push({ resolution, servers })
    })

    res.status(200).json({ episodeTitle, videoUrl, downloads })
  } catch (error) {
    console.error('Error:', error)
    res.status(500).json({ error: 'Failed to fetch episode data' })
  }
}