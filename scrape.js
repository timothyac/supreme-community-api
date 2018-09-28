const request = require('request');
const cheerio = require('cheerio');
const webhook = require('webhook-discord');

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
                const items = []
                var itemCard =$('.card-details').map(function(i,e) {
                    items[i] = $(this).text().replace(/\n/g,'').replace(/\s\s+/g, '').replace(/\$/g, ' -- $');
                });
                items.join(', ');
                callback(items)
            } else {
                console.log(error);
                callback(false);
            }

        })
    };
    get_items(new_url, function(items) {
        items.sort();
        //Hook.custom("Supreme Community","This is what is dropping this week :D" + '\n' + "`Made by Sunstro`", "Information", "#ecee0f"); //Doesn't work properly unless I switch to Asnyc
        for (let item of items) {
            console.log(item + '\n');
            Hook.custom("Supreme Community","**Product**"+ '\n' + item + '\n' + '\n' + "`Info provided by Supreme Community, linked below`" + '\n' + new_url, "SupCom WebHook", "#ff0000");
          }
    });

});
