const defaultConfig = {
	type: 'mongodb',
	synchronize: true,
	logging: false,
	entities: [
		'src/**/*.entity.{ts,js}'
	]
};

if (process.env.NODE_ENV === 'production') {

	module.exports = {
		...defaultConfig,
		url: 'mongodb://root:root1234@ds163905.mlab.com:63905/labs-challenge',
	};
} else if (process.env.NODE_ENV === 'docker') {

	module.exports = {
		...defaultConfig,
		host: 'mongo',
		port: 27017,
		database: 'tt-mongo'
	};
} else {

	module.exports = {
		...defaultConfig,
		host: 'localhost',
		port: 27017,
		database: 'tt-mongo'
	};
}