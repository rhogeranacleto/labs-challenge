import { Entity, ObjectIdColumn, Column } from "typeorm";

@Entity()
export class Tweet {

	@ObjectIdColumn()
	public id: number;

	@Column()
	public tweet_id: number;

	@Column()
	public text: string;

	@Column()
	public date: Date;

	@Column()
	public author: string;

	@Column('array')
	public hashtags: string[];
}