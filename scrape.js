const request = require('request');
const cheerio = require('cheerio');
const webhook = require('webhook-discord');
const merge = require('deepmerge')

const settings = require('./settings');

// sconst Hook = new webhook('https://discordapp.com/api/webhooks/494929110980755468/eFqcXgDODpSC0IuGTq0IcLCd7jcQ6Zlk1bLKQbyKybl1cQ6Iwyy6PhbJiIIOGrhoq6mT');
const Hook = new webhook(settings.webhook);


const url = 'https://www.supremecommunity.com';
const base_url = 'https://www.supremecommunity.com/season/fall-winter2018/droplists/'; // Technically this is not static, as it will have to change with new seasons.

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
    var new_url = url + result
    var get_items = (new_url, callback) => {
        request(new_url, (error, response, html) => {
            if(!error) {
                var $ = cheerio.load(html);
                const images = []
                const names = []
                const prices = []

                var itemCard = $('.card-details').each((i, el) => {
                    names[i] = $(el).attr('data-itemname');
                    prices[i] = $(el).find(".label-price").text().trim().replace('{}', '');
                    images[i] = $(el).find('img').attr('src');

                });
                names.join(', ');
                prices.join(', ');
                callback(names, prices, images);
            } else {
                console.log(error);
                callback(false);
            }

        })
    };
    get_items(new_url, function(names, prices, images) {
        //Hook.custom("Supreme Community","This is what is dropping this week :D" + '\n' + "`Made by Sunstro`", "Information", "#ecee0f"); //Doesn't work properly unless I switch to Asnyc
        
        if(names.length === prices.length) {
            var nV;
            for(nV = 0; nV < names.length; nV++) {
                var new_image = url + images[nV]
                Hook.custom("Supreme Community","**Product**"+ '\n' + names[nV] + '\n' + "**Price**" + '\n' + prices[nV] + '\n' + '\n' + "`Info provided by Supreme Community, linked below`" + '\n' + new_url, "SupCom WebHook", "#ff0000", new_image);
            }
        }
    });

});

