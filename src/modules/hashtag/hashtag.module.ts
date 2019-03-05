import { Module } from "@nestjs/common";
import { HashtagController } from "./hashtag.controller";

@Module({
	controllers: [HashtagController]
})
export class HashtagModule { }