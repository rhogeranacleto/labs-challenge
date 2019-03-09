import { Module, OnModuleInit, HttpModule } from "@nestjs/common";
import { TwitterController } from "./twitter.controller";
import { twitterApiFactory } from "./twitter.factory";
import { TwitterService } from './twitter.service';

@Module({
	controllers: [TwitterController],
	providers: [TwitterService, twitterApiFactory],
	imports: [HttpModule]
})
export class TwitterModule { }