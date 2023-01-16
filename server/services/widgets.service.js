const axios = require('axios');
const cheerio = require('cheerio');
 
/*
Keeping the google scraper as a backup.

async function googleScraper(query) {
  try {
    const response = await axios.get(`https://www.google.com/search?q=${query}&safe=active`);
    const $ = cheerio.load(response.data);
    const links = [];
    $("a").each((i, link) => {
      const url = $(link).attr("href");
      if (url.startsWith("/url?q=")) {
        links.push(url.substring(7));
      }
    });
    return links;
  } catch (error) {
    console.error(error);
  }
}
console.log(googleScraper("Learn how to play the drums").then(console.log));
*/


module.exports.getExternalLinks = async function(query) {
    const API_KEY = process.env.GOOGLE_CUSTOM_SEARCH_API_KEY
    const SEARCH_ENGINE = process.env.GOOGLE_CUSTOM_SEARCH_ENGINE
    try {
        const response = await axios.get('https://www.googleapis.com/customsearch/v1', {
        params: {
            key: API_KEY,
            cx: SEARCH_ENGINE,
            safe: 'active',
            q: query
        }
        });
        const links = response.data.items.map(item => {
            return {
                title: item.title,
                link: item.link,
                snippet: item.snippet
            }
        });
        return links;
    } catch (error) {
        console.error(error);
    }
}