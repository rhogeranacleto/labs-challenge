import { Entity, ObjectID, ObjectIdColumn, Column, CreateDateColumn, Index } from "typeorm";

@Entity()
export class Hashtag {

	@ObjectIdColumn()
	public id: ObjectID;

	@Index({ unique: true })
	@Column()
	public name: string;

	@CreateDateColumn()
	public createdAt: Date;
}