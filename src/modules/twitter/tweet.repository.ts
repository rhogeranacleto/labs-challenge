import { EntityRepository, Repository, FindManyOptions, In, FindConditions } from 'typeorm';
import { Tweet } from './tweet.entity';

@EntityRepository(Tweet)
export class TweetRepository extends Repository<Tweet>{

	public getAll(take?: number, skip?: number, hashtags?: string) {

		const options: FindManyOptions<Tweet> = {
			take,
			skip
		};

		if (hashtags) {

			options.where = {
				hashtags: {
					$in: hashtags.split(',')
				}
			};
		}

		return this.findAndCount(options);
	}
}