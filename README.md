# http-file-response

Send a file back as a HTTP response with support for range queries etc.

```
npm install http-file-response
```

## Usage

``` js
const onfile = require('http-file-response')

http.createServer(function (req, res) {
  onfile('some-file.html', req, res)
})
```

## API

#### `onfile(filename, req, res, [options])`

Options include:

```js
{
  mime: '...', // optionally set the mimetype, defaults to infering it from the name
  fs: ... // optionally pass in your own fs impl to use
}
```

## License

MIT
