import { Module, OnModuleInit } from "@nestjs/common";
import { TwitterModule } from "./twitter/twitter.module";
import { HashtagModule } from "./hashtag/hashtag.module";

@Module({
	imports: [TwitterModule, HashtagModule]
})
export class AppModule implements OnModuleInit {

	public onModuleInit() {

		setInterval(() => {

			
		}, 2000);
	}
}