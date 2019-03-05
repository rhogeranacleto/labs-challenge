import { Module, OnModuleInit } from "@nestjs/common";
// import { TwitterApiService } from "./twitter-api.service";
import { TwitterController } from "./twitter.controller";
import { getMongoRepository } from "typeorm";
import { Hashtag } from "../hashtag/hashtag.entity";
import { twitter } from "./twitter-api.service";

@Module({
	// providers: [TwitterApiService],
	controllers: [TwitterController]
})
export class TwitterModule implements OnModuleInit {

	public async onModuleInit() {

		// setInterval(async () => {

			const repository = await getMongoRepository(Hashtag);

			const hashtags = await repository.find();

			if (hashtags.length) {

				const tweets = await twitter.get('search/tweets', {
					q: hashtags.map(hashtag => `#${hashtag.name}`).join(' OR '),
					// since_id,
					result_type:'recent'
				});

				console.log(tweets.statuses.map((j: any) => j.created_at));
			}
		// }, 30000);
	}
}