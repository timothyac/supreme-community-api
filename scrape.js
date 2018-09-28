const request = require('request');
const cheerio = require('cheerio');

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

            // console.log(items)
        })
    };
    get_items(new_url, function(items) {
        for (let item of items) {
            console.log(item);
          }
    });

});
