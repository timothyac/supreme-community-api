const request = require('request');
const cheerio = require('cheerio');
const webhook = require('webhook-discord');

const settings = require('./settings');

const Hook = new webhook(settings.webhook);

const url = 'https://www.supremecommunity.com';
const base_url = 'https://www.supremecommunity.com/season/latest/times/eu/';

const get_latest = (base_url, callback) => {
    request(base_url, (error, response, html) => {
        if(!error && response.statusCode == 200) {
            var $ = cheerio.load(html);
            var latest_url = $('.block');

            if(latest_url.is('h2') === false) {
                callback(latest_url.first().attr('href'));
            } else {
                console.log('Tryin again');
                callback(false);
            }   
        } else {
            console.log(error);
            callback(false);
        }           
    });
};

get_latest(base_url, function(result) {
    var newUrl = url + result
    console.log(newUrl)
    var getTimes = (newUrl, callback) => {
        request(newUrl, (error, response, html) => {
            if(!error) {
                var $ = cheerio.load(html);
                const names = []
                const sizes = []
                const times = []
                const images = []

                const item = $(".col-xs-12.sellout-name").each((i, el) => {
                    names[i] = $(el).text().trim();
                });

                const size = $(".col-xs-6.sellout-colorway").each((i, el) => {
                    sizes[i] = $(el).text().trim();
                });

                const time = $(".col-xs-6.color--primary.sellout-times").each((i, el) => {
                    times[i] = $(el).text().trim();
                });

                const image = $(".image-proportional.img-responsive").each((i, el) => {
                    images[i] = $(el).attr('data-src').replace('//', 'http://');
                });

                // console.log(images)

                // var itemRow = $('.col-xs-10.col-md-11.sellout-info').each((i, el) => {
                //     names[i] = $(el).find(".col-xs-12.sellout-name").text().trim();
                //     sizes[i] = $(el).find(".col-xs-6.sellout-colorway").text().trim();
                //     times[i] = $(el).find(".col-xs-6.color--primary.sellout-timesy").text().trim();
                //     images[i] = $(el).find('img').attr('src');

                // });

                callback(names, sizes, times, images)
            } else {
                console.log(error)
            }
        })
    };
    getTimes(newUrl, function(names, sizes, times, images) {
        if(names.length === sizes.length) {
            var nV;
            for(nV = 0; nV < 10; nV++) {
                // This whole script will have to be rewritten inside of an Async function,
                // because when this sends a webhook, it is just doing so by random.
                Hook.custom("Supreme Community","**Product**" + '\n' + names[nV] + '\n' + "**Colorway**" + '\n' + sizes[nV] + '\n' + "**Soldout In**" + '\n' + times[nV] + '\n', "SupCom WebHook", "#ff0000", images[nV]);
            }
        }
    });

}) 