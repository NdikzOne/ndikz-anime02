import axios from 'axios'
import * as cheerio from 'cheerio'

export default async function handler(req, res) {
  const { q } = req.query

  if (!q) {
    return res.status(400).json({ error: 'Search query is required' })
  }

  try {
    const { data } = await axios.get(`https://otakudesu.best/?s=${encodeURIComponent(q)}&post_type=anime`, {
      headers: { 'User-Agent': 'Mozilla/5.0' }
    })

    const $ = cheerio.load(data)
    const results = []

    $('ul.chivsrc li').each((i, el) => {
      const image = $(el).find('img').attr('src') || ''
      const title = $(el).find('h2 a').text().trim()
      const link = $(el).find('h2 a').attr('href') || ''
      const genres = []
      $(el).find('.set').first().find('a').each((i, a) => {
        genres.push($(a).text().trim())
      })
      const status = $(el).find('.set').eq(1).text().replace('Status :', '').trim()
      const rating = $(el).find('.set').eq(2).text().replace('Rating :', '').trim()

      results.push({
        title,
        link,
        image,
        genres,
        status,
        rating
      })
    })

    res.status(200).json(results)
  } catch (error) {
    console.error('Error:', error)
    res.status(500).json({ error: 'Failed to fetch search results' })
  }
}