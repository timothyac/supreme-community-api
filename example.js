const scraper = require('./scrape')

const webhook = "https://discordapp.com/api/webhooks/524414463491964939/bX6vECM9a7-PNJjVOg2TtEs-vUAX1SlTa3yFJnfIKg4hdDHEz7RHhzaqo9wmcOt0h7cP"

async function start() {
  // Get href
  let href = await scraper.getLatestWeek()
  console.log(href)
  // Pass href into grabNewItems
  let list = await scraper.grabNewItems(href)
  console.log(list)
  // Pass list into sendToDiscord
  await scraper.sendToDiscord(list, webhook)
  console.log("Done!")
}

start()