const request = require('request');
const cheerio = require('cheerio');

const base_url = 'https://www.supremecommunity.com/season/fall-winter2018/droplists/';
const url = 'https://www.supremecommunity.com';

const get_latest = (callback) => {
    request(base_url, (error, response, html) => {
        if(error) {
            console.log(error)
        };
        const $ = cheerio.load(html);

        return result = $('.block')
        .first()
        .attr('href');

        // console.log(result);

            
    });
};

get_latest();

console.log(result);


// const get_result = () => {
//     request(url,(error, response, html, cb) => {
//         if (!error && response.statusCode == 200) {
//             const $ = cheerio.load(html);

//             var result = $('.card-details').each((i, el, result) => {
//                 const item = $(el)
//                 .find('.card__body')
//                 .text();

//                 const price = $(el)
//                 .find('.label-price')
//                 .text();

//                 var result = ("Item: " + item.trim() + " Price: " + price.trim());
//                 return result
//             });

//          }

// });
// }

// var new_result = $('.card-details').find('.card__body').text().replace(/\s\s+/g, '');
// console.log(new_result);





