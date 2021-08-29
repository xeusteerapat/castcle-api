# Solution

assume `node`, `docker` have been installed already.

## clone repository

```shell
git clone https://github.com/xeusteerapat/castcle-api.git
```

## go to project directory

```shell
cd castcle-api
```

## checkout `assignment-teerapat` branch

```shell
git checkout assignment-teerapat
```

## install dependencies

```shell
npm install
```

or

```shell
yarn
```

## create database using docker

```shell
docker-compose up -d
```

## start project

```shell
npm start
```

or

```shell
yarn start
```

## visit endpoint

```shell
http://localhost:3333/metadata/hashtags
```

## create new hashtag

```http
# create new hashtag

POST http://localhost:3333/metadata/hashtags HTTP/1.1
content-type: application/json

{
    "slug": "#casttoken",
    "name": "CAST Token",
    "key": "hashtag.castcle"
}

###


GET http://localhost:3333/metadata/hashtags HTTP/1.1
```
