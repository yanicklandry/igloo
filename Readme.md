
# Igloo [![NPM version](https://badge.fury.io/js/igloo.png)](http://badge.fury.io/js/igloo)

![Igloo](https://filenode.s3.amazonaws.com/igloo.png)

Igloo is a lightweight, fast, and minimal framework for rapid development.

View documentation for Igloo at <http://documentup.com/niftylettuce/igloo>.


## Dependencies

* [Node](http://nodejs.org)
* [Redis](http://redis.io/)
* [MongoDB](http://www.mongodb.org/)


## Reference

Please use [`eskimo`](https://github.com/niftylettuce/eskimo) in order to build an `igloo`.

```bash
npm install -g eskimo
eskimo --help
```


## Components

Using `electrolyte`, you an inject the following dependencies into your app with `eskimo`:

* `app` - returns an instance of `express()`
* `error-handler` - returns an error handler that can be used via `app.use`
* `db` - returns connection to MongoDB
* `logger` - returns a Winston logger instance
* `model-common-plugin` - returns a Mongoose plugin for common schema paths
* `sessions` - returns connection to Redis
* `settings` - returns config


## Contributors

* Nick Baugh <niftylettuce@gmail.com>


## Credits

* [Igloo](http://thenounproject.com/term/igloo/26547/) by VALÈRE DAYAN from The Noun Project
* [ESKIMO IGLOO](http://www.colourlovers.com/palette/1933518/ESKIMO_IGLOO) (color palette)


## License

The MIT License

Copyright (c) 2014- Nick Baugh niftylettuce@gmail.com (http://niftylettuce.com/)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
