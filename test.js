const supremeCommunity = require("./index.js");

supremeCommunity()
  .then((items) => console.log(items))
  .catch((err) => console.log(err));
