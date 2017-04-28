# ccmixer
a creative commons mixer as a stateless NodeJS micro service

![alt tag](https://github.com/rootzoll/ccmixer/blob/master/static/ccmixer-idee.png?raw=true)

## Setup

```
npm install
npm start
```

## ccmixer API v0.1

Example Call:

```
http://HOST:PORT/mixer?in=cc-0&in=cc-by-sa
```

Example Result:

```
{"ts":1493368173881,"input":["cc-0","cc-by-sa"],"output":["cc-by-sa"]}
```
