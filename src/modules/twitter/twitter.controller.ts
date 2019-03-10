import { Controller, Get, Query, HttpService } from "@nestjs/common";
import { TwitterService } from './twitter.service';
import { getCustomRepository } from 'typeorm';
import { TweetRepository } from './tweet.repository';

@Controller()
export class TwitterController {

	constructor(
		private readonly twitterService: TwitterService,
		private readonly httpService: HttpService) { }

	@Get()
	public async startTheMagic() {

		await this.twitterService.startTheMagic();

		setTimeout(() => {

			this.httpService.get(process.env.NODE_ENV ? 'https://labs-challenge.herokuapp.com/' : 'http://localhost:8000').toPromise();
		}, 30000);
	}

	@Get('tweets')
	public getTweets(
		@Query('take') take?: number,
		@Query('skip') skip?: number,
		@Query('hashtags') hashtags?: string) {

		return getCustomRepository(TweetRepository).getAll(take, skip, hashtags);
	}
}