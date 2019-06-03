const cheerio = require("cheerio");
const rp = require("request-promise");
const Discord = require("discord.js");

const { asyncForEach } = require("./utils/asyncForEach");
const { sleep } = require("./utils/sleep");

let scraper = {};
const options = {
  url: undefined,
  transform: function(body) {
    return cheerio.load(body);
  }
};

scraper.getLatestWeek = function() {
  options.url = "https://www.supremecommunity.com/season/latest/droplists/";
  return new Promise(function(resolve, reject) {
    rp(options).then($ => {
      // Search for elements with the block class
      const latestURL = $(".block");

      // If the element isn't a header, then resolve it
      if (!latestURL.is("h2")) {
        const href = latestURL.first().attr("href");
        resolve(href);
      } else {
        reject("Couldn't find link");
      }
    });
  });
};

scraper.grabNewItems = function(href) {
  options.url = `https://www.supremecommunity.com/${href}`;
  return new Promise(function(resolve, reject) {
    rp(options).then($ => {
      // Define items as having a card-details class
      const items = $(".card-details");

      // Array to store items
      let list = [];

      if (items) {
        items.each((i, el) => {
          let obj = {};
          // Name of item
          obj.name = $(el)
            .find("h2")
            .text();
          // Code value that Supreme Community gives an item
          obj.code = $(el).attr("data-itemid");
          // Price of item
          obj.price = $(el)
            .find(".label-price")
            .text()
            .trim();
          // Image Href of item
          let imageURL = $(el)
            .find("img")
            .attr("src");
          obj.image = `https://www.supremecommunity.com${imageURL}`;

          list.push(obj);
        });
        resolve(list);
      } else {
        reject("Couldn't find any items");
      }
    });
  });
};

scraper.sendToDiscord = function(list, webhook) {
  // Chop up the user's webhook
  const tokenAndID = webhook.slice(36).split("/");

  // Attach webhook to a new webhookClient
  const client = new Discord.WebhookClient(tokenAndID[0], tokenAndID[1]);

  // Loop through each item in the list
  asyncForEach(list, async item => {
    // Build webhook embed
    const embed = await new Discord.RichEmbed()
      .setAuthor(item.name)
      .setFooter("Supreme Community API")
      .setTimestamp()
      .setImage(item.image)
      .setColor("#F00000");

    // Send to server
    await client.send(embed);

    // Sleep for 1.5 sec, that way discord doesn't rate limit
    await sleep(1500);
  });
};

module.exports = scraper;
