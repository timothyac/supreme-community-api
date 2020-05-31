# supreme-community-api

[![NPM](https://nodei.co/npm/supreme-community-api.png)](https://www.npmjs.com/package/supreme-community-api)

### How to install

`npm install supreme-community-api --save`

### Usage (Promises)

```javascript
const supremeCommunity = require("supreme-community-api");

supremeCommunity()
  .then((items) => console.log(items)) // [{name: 'Box Logo', price: '$50', image: 'http://'}, ...]
  .catch((err) => console.log(err));
```

### Usage (Async/Await)

```javascript
const supremeCommunity = require("supreme-community-api");

async function init() {
  const items = await supremeCommunity();

  console.log(items); // [{name: 'Box Logo', price: '$50', image: 'http://'}, ...]
}
```

## License

supreme-community-api is licensed under [MIT License](https://github.com/SunstroUS/supreme-community-api/blob/master/LICENSE).
