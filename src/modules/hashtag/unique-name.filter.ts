import { ExceptionFilter, Catch, InternalServerErrorException, ArgumentsHost } from "@nestjs/common";
import { BaseExceptionFilter } from "@nestjs/core";

@Catch()
export class UniqueNameFilter extends BaseExceptionFilter implements ExceptionFilter {

	public catch(exception: InternalServerErrorException, host: ArgumentsHost) {

		const context = host.switchToHttp();
		const response = context.getResponse();
		
		if (exception.constructor.name === 'BulkWriteError') {

			return response.status(500).json({
				status: 500,
				message: 'Já existe essa hashtag cadastrada'
			});
		}

		super.catch(exception, host);
	}
}