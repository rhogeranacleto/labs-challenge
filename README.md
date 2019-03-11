# The Greatest twitter Robot

<details>
	<summary>Usage with Docker</summary>
	
### Requeriments
- Docker

Run docker build command: `docker-compose up`

Then you can access **localhost:8000/**

_And that is it :tada:!_
</details>

<details>
<summary>Usage on local</summary>

### Requeriments

- node 8.11.3
- mongo 3.x running on port 27027

Run `npm install` then `npm run dev`.

Then you can access **localhost:8000/**

_And that is it :tada:!_
</details>

<details>
<summary>Usage with heroku</summary>

Just access **https://labs-challenge.herokuapp.com/**

_And that is it :tada:!_
</details>

## API's

- `GET /`: will start the magic of getting twitts each 10 seconds
- `GET /tweets`: will list the tweets on database
	- you can pass the following query parameters to filter
		- `take`: take number of tweets
		- `skip`: skip number of tweets
		- `hashtags`: list of hashtags separated by comma. E.g.: `?hashtags=one,two,three`
- `GET hashtag`: list hashtags on database
- `POST hashtags`: create a hashtag on database. E.g.: `{ "name": "one" }`
- `DELETE hashtags`: delete a hashtag on database.
	- accept following query params
		- `id`: id of hashtag on database
		- `name`: hashtag name

## Tests

Just run `npm test` :wink: