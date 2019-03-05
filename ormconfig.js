module.exports = {
	type: 'mongodb',
	host: 'localhost',
	port: 27017,
	username: '',
	password: '',
	database: 'tt-mongo',
	synchronize: true,
	logging: false,
	entities: [
		'src/**/*.entity.ts'
	]
}