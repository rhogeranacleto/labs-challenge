import { Controller, Post, Body, Get, Delete, Query, UseFilters } from "@nestjs/common";
import { getMongoRepository, DeepPartial } from "typeorm";
import { Hashtag } from "./hashtag.entity";
import { UniqueNameFilter } from "./unique-name.filter";

@Controller('hashtags')
export class HashtagController {

	@Post()
	@UseFilters(UniqueNameFilter)
	public create(@Body() hashtag: DeepPartial<Hashtag>) {

		return getMongoRepository(Hashtag).save(hashtag);
	}

	@Get()
	public list() {

		return getMongoRepository(Hashtag).find();
	}

	@Delete()
	public async delete(@Query('id') id?: string, @Query('name') name?: string) {

		const repository = getMongoRepository(Hashtag);

		const hashtags = await repository.find({
			where: {
				$or: [{
					id
				}, {
					name
				}]
			}
		});

		return repository.remove(hashtags);
	}
}