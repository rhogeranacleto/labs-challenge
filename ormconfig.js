const defaultConfig = {
	type: 'mongodb',
	synchronize: true,
	logging: false,
	entities: [
		'src/**/*.entity.{ts,js}'
	]
};

if (process.env.NODE_ENV) {

	module.exports = {
		...defaultConfig,
		url: 'mongodb://root:root1234@ds163905.mlab.com:63905/labs-challenge',
	};
} else {
	
	module.exports = {
		...defaultConfig,
		host: 'localhost',
		port: 27027,
		database: 'tt-mongo'
	};
}