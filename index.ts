import { NestFactory } from '@nestjs/core';
import { AppModule } from './src/modules/app.module';
import { createConnection } from 'typeorm';

async function bootstrap() {

	await createConnection();

	const app = await NestFactory.create(AppModule);

	await app.listen(8000);
}

bootstrap().catch(e => {

	console.error(e);
});