import { TwitterService } from '../twitter.service';
import * as typeorm from 'typeorm';
import { Hashtag } from '../../hashtag/hashtag.entity';
import { Tweet } from '../tweet.entity';

describe('Twitter service tests', () => {

	const get = jest.fn();
	const twitterService = new TwitterService({
		get
	} as any);
	const repository = {
		find: jest.fn(),
		findOne: jest.fn(),
		create: jest.fn(),
		save: jest.fn()
	};
	const getMongoRepository = jest.fn().mockReturnValue(repository);

	jest.spyOn(typeorm, 'getMongoRepository').mockImplementation(getMongoRepository);

	it('should startTheMagic call repositories and finds', async () => {

		repository.find.mockResolvedValueOnce([]);

		await twitterService.startTheMagic();

		expect(getMongoRepository).toBeCalledWith(Hashtag);
		expect(getMongoRepository).toBeCalledWith(Tweet);
		expect(repository.find).toBeCalled();
	});

	describe('startTheMagic action', () => {

		repository.find.mockResolvedValue([{
			name: 'one'
		}, {
			name: 'two'
		}]);

		it('should call twitter api not passing last tweet id', async () => {

			get.mockResolvedValueOnce({
				statuses: []
			});
			repository.create.mockReturnValueOnce([]);

			await twitterService.startTheMagic();

			expect(repository.findOne).toBeCalledWith({
				order: {
					date: -1
				}
			});

			expect(get).toBeCalledWith('search/tweets', {
				q: '#one OR #two AND -filter:retweets',
				since_id: undefined,
				result_type: 'recent',
				include_entities: true,
				count: 100,
				tweet_mode: 'extended'
			});
		});

		it('should call twitter api passing last tweet id', async () => {

			get.mockResolvedValueOnce({
				statuses: []
			});
			repository.create.mockReturnValueOnce([]);
			repository.findOne.mockResolvedValue({
				tweet_id: 44
			});

			await twitterService.startTheMagic();

			expect(get).toBeCalledWith('search/tweets', {
				q: '#one OR #two AND -filter:retweets',
				since_id: 44,
				result_type: 'recent',
				include_entities: true,
				count: 100,
				tweet_mode: 'extended'
			});
		});

		it('should filter not last tweet', async () => {

			get.mockResolvedValueOnce({
				statuses: [{
					id: 333,
					user: {
						screen_name: 'screen_name'
					},
					entities: {
						hashtags: [{
							text: 'text'
						}]
					}
				}, {
					id: 2,
					user: {
						screen_name: 'screen_name'
					},
					entities: {
						hashtags: [{
							text: 'text'
						}]
					}
				}]
			});
			repository.create.mockReturnValueOnce([{
				tweet_id: 333
			}, {
				tweet_id: 2
			}]);
			repository.findOne.mockResolvedValue({
				tweet_id: 333
			});

			await twitterService.startTheMagic();

			expect(repository.create).toBeCalledWith([{
				author: 'screen_name',
				date: expect.any(Date),
				hashtags: ['text'],
				text: undefined,
				tweet_id: 2
			}, {
				author: 'screen_name',
				date: expect.any(Date),
				hashtags: ['text'],
				text: undefined,
				tweet_id: 333
			}]);

			expect(repository.save).toBeCalledWith([{
				tweet_id: 2
			}]);
		});
	});
});