import { HashtagController } from '../hashtag.controller';
import * as typeorm from 'typeorm';
import { Hashtag } from '../hashtag.entity';

describe('Hashtag controller tests', () => {

	const controller = new HashtagController();
	const repository = {
		save: jest.fn(),
		find: jest.fn(),
		remove: jest.fn()
	}
	const getMongoRepository = jest.fn().mockReturnValue(repository);

	jest.spyOn(typeorm, 'getMongoRepository').mockImplementation(getMongoRepository);

	it('should create call save of repository', async () => {

		const hashtag = {};

		repository.save.mockResolvedValueOnce('saved');

		await expect(controller.create(hashtag)).resolves.toEqual('saved');
		expect(getMongoRepository).toBeCalledWith(Hashtag);
		expect(repository.save).toBeCalledWith(hashtag);
	});

	it('should list call find of repository', async () => {

		repository.find.mockResolvedValueOnce('finded');

		await expect(controller.list()).resolves.toEqual('finded');
		expect(getMongoRepository).toBeCalledWith(Hashtag);
		expect(repository.find).toBeCalled();
	});

	it('should remove call save of repository', async () => {

		repository.find.mockResolvedValueOnce('finded');
		repository.remove.mockResolvedValueOnce('removed');

		await expect(controller.delete('1', 'df')).resolves.toEqual('removed');
		expect(getMongoRepository).toBeCalledWith(Hashtag);
		expect(repository.find).toBeCalledWith({
			where: {
				$or: [{
					id: '1'
				}, {
					name: 'df'
				}]
			}
		});
		expect(repository.remove).toBeCalledWith('finded');
	});
});