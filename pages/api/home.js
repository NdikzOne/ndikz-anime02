import axios from 'axios'
import * as cheerio from 'cheerio'

export default async function handler(req, res) {
  try {
    const { data } = await axios.get('https://otakudesu.best/', {
      headers: { 'User-Agent': 'Mozilla/5.0' }
    })

    const $ = cheerio.load(data)

    const ongoing = []
    $('.venz .detpost').each((i, el) => {
      const animeTitle = $(el).find('.jdlflm').text().trim()
      const episode = $(el).find('.epz').text().trim()
      const date = $(el).find('.epztipe').text().trim()
      const imageUrl = $(el).find('img').attr('src')
      const animePage = $(el).find('a').attr('href')

      ongoing.push({
        animeTitle,
        episode,
        date,
        imageUrl,
        animePage
      })
    })

    res.status(200).json(ongoing)
  } catch (error) {
    console.error('Error:', error)
    res.status(500).json({ error: 'Failed to fetch data' })
  }
}