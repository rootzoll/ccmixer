# ccmixer
a creative commons mixer as a stateless NodeJS micro service

![alt tag](https://github.com/rootzoll/ccmixer/blob/master/static/ccmixer-idee.png?raw=true)

## Setup Locally

```
npm install
npm start
```

## Run from DockerHub

```
docker run -d --name ccmixer -p 3003:3003 rootzoll/ccmixer
```

## Build and Rund Docker Locally

```
docker build -t="rootzoll/ccmixer" .
docker run -d --name ccmixer -p 3003:3003 rootzoll/ccmixer
docker logs ccmixer -f
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
