import { UniqueNameFilter } from '../unique-name.filter';
import { BaseExceptionFilter } from '@nestjs/core';
import { InternalServerErrorException } from '@nestjs/common';

describe('Unique-name filter tests', () => {

	const uniqueNameFilter = new UniqueNameFilter();
	const catchFn = jest.fn().mockReturnValue('catch');
	const response = {
		status: jest.fn().mockReturnThis(),
		json: jest.fn()
	}
	const host = {
		switchToHttp: () => ({
			getResponse: () => response
		})
	};

	jest.spyOn(BaseExceptionFilter.prototype, 'catch').mockImplementation(catchFn);

	it('should catch not treat response', () => {

		const exception = new InternalServerErrorException();

		expect(uniqueNameFilter.catch(exception, host as any))

		expect(response.status).not.toBeCalled();
		expect(response.json).not.toBeCalled();
		expect(catchFn).toBeCalledWith(exception, host);
	});

	it('should catch treat response', () => {

		const exception = {
			constructor: {
				name: 'BulkWriteError'
			}
		};

		uniqueNameFilter.catch(exception as any, host as any);

		expect(response.status).toBeCalledWith(500);
		expect(response.json).toBeCalledWith({
			status: 500,
			message: 'Já existe essa hashtag cadastrada'
		});
		expect(catchFn).not.toBeCalled();
	});
});