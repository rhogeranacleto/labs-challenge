import { TweetRepository } from '../tweet.repository';

describe('Tweet repository service', () => {

	const tweetRepository = new TweetRepository();

	jest.spyOn(tweetRepository, 'findAndCount').mockResolvedValue('finded' as any);

	it('should not filter by hashtags', async () => {

		await expect(tweetRepository.getAll(1, 1)).resolves.toEqual('finded');

		expect(tweetRepository.findAndCount).toBeCalledWith({
			skip: 1,
			take: 1
		});
	});

	it('should filter by hashtags', async () => {

		await expect(tweetRepository.getAll(1, 1, 'one,two')).resolves.toEqual('finded');

		expect(tweetRepository.findAndCount).toBeCalledWith({
			skip: 1,
			take: 1,
			where: {
				hashtags: {
					$in: ['one', 'two']
				}
			}
		});
	});
});