const { scrape, getLatestWeek, getItems } = require("./dist/index.js");

scrape(10)
  .then((items) => console.log(items))
  .catch((err) => console.log(err));

// getLatestWeek(10).then((week) => getItems(week));
