import cheerio from "cheerio";
import rp from "request-promise";

const latestSeason =
  "https://www.supremecommunity.com/season/latest/droplists/";

const options = (url: string) => ({
  url,
  transform: function (body: any) {
    return cheerio.load(body);
  },
});

/**
 * Get the latest week of the current season
 *
 * @returns {string} The url of the most recent season
 */
const getLatestWeek = async (): Promise<string> => {
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
const getItems = async (latestWeek: string): Promise<Item[]> => {
  const $ = await rp(options(latestWeek));

  // Get all of the items on the page
  const pageItems = await $(".card.card-2");

  let items: Item[] = [];

  // Loop through each item
  pageItems.each((i: number, el: Element) => {
    const item = {
      id: i + 1,
      name: $(el).find("h2").text(),
      price: $(el).find(".label-price").text().trim(),
      image: `https://www.supremecommunity.com${$(el).find("img").attr("src")}`,
      description: $(el).find("img").attr("alt").split(" - ")[1],
      category: $(el).find(".category").text(),
    };

    items.push(item as Item);
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
