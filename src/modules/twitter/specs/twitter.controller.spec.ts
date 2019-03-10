import { Test } from '@nestjs/testing';
import { TwitterController } from '../twitter.controller';
import { TwitterService } from '../twitter.service';
import { twitterApiFactory } from '../twitter.factory';
import { HttpModule, HttpService } from '@nestjs/common';
import * as typeorm from 'typeorm';
import { TweetRepository } from '../tweet.repository';

jest.useFakeTimers();

describe('Twitter controller tests', () => {

	let twitterController: TwitterController;
	let twitterService: TwitterService;
	let httpService: HttpService;

	const repository = {
		getAll: jest.fn()
	};

	jest.spyOn(typeorm, 'getCustomRepository').mockReturnValue(repository as any);

	beforeEach(async () => {

		const module = await Test.createTestingModule({
			controllers: [TwitterController],
			providers: [TwitterService, twitterApiFactory],
			imports: [HttpModule]
		}).compile();

		twitterController = module.get(TwitterController);
		twitterService = module.get(TwitterService);
		httpService = module.get(HttpService);
	});

	it('should startTheMagic call startTheMagic from service', async () => {

		const toPromise = jest.fn();
		const get = jest.fn().mockReturnValue({
			toPromise
		});

		jest.spyOn(twitterService, 'startTheMagic').mockResolvedValueOnce('ok' as any);
		jest.spyOn(httpService, 'get').mockImplementation(get);

		await twitterController.startTheMagic();

		jest.runAllTimers();

		expect(httpService.get).toBeCalledWith('http://localhost:8000');
	});

	it('should getTweet return getAll from repository', async () => {

		repository.getAll.mockResolvedValueOnce('get');

		await expect(twitterController.getTweets(1, 1, 'hash')).resolves.toEqual('get');

		expect(typeorm.getCustomRepository).toBeCalledWith(TweetRepository);
		expect(repository.getAll).toBeCalledWith(1, 1, 'hash');
	});
});