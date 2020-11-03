# supreme-community-api

[![NPM](https://nodei.co/npm/supreme-community-api.png)](https://www.npmjs.com/package/supreme-community-api)

### How to install

`npm install supreme-community-api --save`

### Usage (Promises)

```javascript
const { scrape } = require("supreme-community-api");

scrape()
  .then((items) => console.log(items)) // [{name: 'Box Logo', price: '$50', image: 'http://'}, ...]
  .catch((err) => console.log(err));
```

### Usage (Async/Await)

```javascript
const { scrape } = require("supreme-community-api");

async function init() {
  const items = await scrape();

  console.log(items); // [{name: 'Box Logo', price: '$50', image: 'http://'}, ...]
}
```

## License

supreme-community-api is licensed under [MIT License](https://github.com/SunstroUS/supreme-community-api/blob/master/LICENSE).
