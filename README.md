# supreme-community-api

[![NPM](https://nodei.co/npm/supreme-community-api.png)](https://www.npmjs.com/package/supreme-community-api)

### How to install
```npm install supreme-community-api --save```

supreme-community-api use's promises, and works best in async/await.

`.getLatestWeek` will return a href for the latest week on the supreme community website.

`.grabNewItems` will take a href (from getLatestWeek) and then return an array of items,
stored as objects. Each object contains a name, item code (from supreme community), price,
and image url.

`.sendToDiscord` will take an array of objects, and send them to the webhook passed in.

### Usage
```javascript
const supremeCommunity = require('supreme-community-api');

supremeCommunity.getLatestWeek()
  .then(href => console.log(href)) // /season/spring-summer2019/droplist/2019-04-18/

supremeCommunity.grabNewItems(href)
  .then(list => console.log(list)) // [{name: 'Box Logo', code: '1234', price: '$50', image: 'http://'}, ...]

const webhook = 'https://discordapp.com/api/webhooks/123456789/abc123def456-abc123def456-abc123def456abc123def456'
supremeCommunity.sendToDiscord(list, webhook)

```

### Example
```javascript
const supremeCommunity = require('supreme-community-api');

const webhook = 'https://discordapp.com/api/webhooks/123456789/abc123def456-abc123def456-abc123def456abc123def456'

async function start() {
  // Get href
  let href = await supremeCommunity.getLatestWeek()
  console.log(href)
  // Pass href into grabNewItems
  let list = await supremeCommunity.grabNewItems(href)
  console.log(list)
  // Pass list into sendToDiscord
  await supremeCommunity.sendToDiscord(list, webhook)
  console.log("Done!")
}

```

## License
supreme-community-api is licensed under [MIT License](https://github.com/SunstroUS/supreme-community-api/blob/master/LICENSE).