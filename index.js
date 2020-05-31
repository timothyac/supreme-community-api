const cheerio = require("cheerio");
const rp = require("request-promise");

const latestSeason =
  "https://www.supremecommunity.com/season/latest/droplists/";

const options = (url) => ({
  url,
  transform: function (body) {
    return cheerio.load(body);
  },
});

/**
 * Get the latest week of the current season
 *
 * @returns {string} The url of the most recent season
 */
const getLatestWeek = async () => {
  const $ = await rp(options(latestSeason));

  const path = $("a.block").first().attr("href");

  return `https://www.supremecommunity.com/${path}`;
};

/**
 * Get all of the latest items from the latest week
 *
 * @param {string} latestWeek
 * @returns {array} Array of all the items in the latest week
 */
const getItems = async (latestWeek) => {
  const $ = await rp(options(latestWeek));

  // Get all of the items on the page
  const pageItems = await $(".card.card-2");

  let items = [];

  // Loop through each item
  pageItems.each((i, el) => {
    let obj = {};
    // Give ID
    obj.id = i + 1;
    // Name of item
    obj.name = $(el).find("h2").text();
    // Price of item
    obj.price = $(el).find(".label-price").text().trim();
    // Image Href of item
    const imageURL = $(el).find("img").attr("src");
    obj.image = `https://www.supremecommunity.com${imageURL}`;
    // Description of item
    const description = $(el).find("img").attr("alt");
    obj.description = description.split(" - ")[1];
    // Category of item
    const category = $(el).find(".category").text();
    obj.category = category;

    items.push(obj);
  });

  return items;
};

/**
 * Get the latest week, then get the latest items, store them in an array and return the value
 *
 * @returns {array} Array of all the items in the latest week
 */
const scrape = async () => {
  const latestWeek = await getLatestWeek();

  const latestItems = await getItems(latestWeek);

  return latestItems;
};

module.exports = scrape;
