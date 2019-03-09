import { Injectable } from '@nestjs/common';
import { getMongoRepository } from 'typeorm';
import { Hashtag } from '../hashtag/hashtag.entity';
import { Tweet } from './tweet.entity';
import Twitter from 'twitter';

@Injectable()
export class TwitterService {

	constructor(private readonly twitter: Twitter) { }

	public async startTheMagic() {

		const hashtagRepository = getMongoRepository(Hashtag);
		const tweetRepository = getMongoRepository(Tweet);

		const hashtags = await hashtagRepository.find();

		if (hashtags.length) {

			const lastTweet = await tweetRepository.findOne({
				order: {
					date: -1
				}
			});

			console.log(lastTweet && lastTweet.tweet_id)
			const res = await this.twitter.get('search/tweets', {
				q: hashtags.map(hashtag => `#${hashtag.name}`).join(' OR ') + ' AND -filter:retweets',
				since_id: lastTweet && lastTweet.tweet_id,
				result_type: 'recent',
				include_entities: true,
				count: 100,
				tweet_mode: 'extended'
			});

			let tweets = tweetRepository.create(res.statuses.reverse().map((tweet: any) => {

				return {
					tweet_id: tweet.id,
					text: tweet.full_text,
					date: new Date(tweet.created_at),
					author: tweet.user.screen_name,
					hashtags: tweet.entities.hashtags.map((hashtag: any) => hashtag.text)
				};
			}));

			if (lastTweet) {

				tweets = tweets.filter(tweet => tweet.tweet_id !== lastTweet.tweet_id);
			}

			if (tweets.length) {

				return tweetRepository.save(tweets);
			}
		}
	}
}