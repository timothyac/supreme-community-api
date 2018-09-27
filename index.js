const Webhook = require('webhook-discord');
const Scrape = require('./scrape');

const Hook = new Webhook('https://discordapp.com/api/webhooks/494930387491880962/V3MLuS7DQxP8vkxydjmzqzla4AzMoSFL4-lrV_iRGmc3wlWiygnp6NmFmWYC4yBeSLiR');
//https://discordapp.com/api/webhooks/494929110980755468/eFqcXgDODpSC0IuGTq0IcLCd7jcQ6Zlk1bLKQbyKybl1cQ6Iwyy6PhbJiIIOGrhoq6mT

console.log(Scrape.get_result());

//Hook.info("Webhook Name", "Info");