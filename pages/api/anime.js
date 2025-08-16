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

    // Judul utama
    const title = $('.jdlrx h1').text().trim()

    // Info detail anime
    const details = {}
    $('.infozingle p').each((i, el) => {
      const label = $(el).find('b').text().replace(':', '').trim()
      const value = $(el).text().replace($(el).find('b').text(), '').trim()
      details[label] = value
    })

    // Sinopsis
    const synopsis = $('.sinopc').text().trim()

    // List episode (judul + link)
    const episodes = []
    $('.episodelist ul li').each((i, el) => {
      const episodeTitle = $(el).find('a').text().trim()
      const episodeUrl = $(el).find('a').attr('href')
      episodes.push({ episodeTitle, episodeUrl })
    })

    res.status(200).json({ title, details, synopsis, episodes })
  } catch (error) {
    console.error('Error:', error)
    res.status(500).json({ error: 'Failed to fetch anime details' })
  }
}