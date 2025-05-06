const puppeteer = require('puppeteer');

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { url } = req.query;
  if (!url) {
    return res.status(400).json({ message: 'URL is required' });
  }

  try {
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();
    await page.goto(url);

    // Wait for video results to load
    await page.waitForSelector('ytd-video-renderer');

    // Get the first video (most viewed due to search parameters)
    const videoId = await page.evaluate(() => {
      const firstVideo = document.querySelector('ytd-video-renderer');
      if (!firstVideo) return null;
      
      const link = firstVideo.querySelector('a#video-title');
      if (!link) return null;

      const href = link.getAttribute('href');
      const match = href.match(/[?&]v=([^&]+)/);
      return match ? match[1] : null;
    });

    await browser.close();

    if (!videoId) {
      return res.status(404).json({ message: 'No video found' });
    }

    res.status(200).json({ videoId });
  } catch (error) {
    console.error('Error scraping YouTube:', error);
    res.status(500).json({ message: 'Error scraping YouTube', error: error.message });
  }
} 