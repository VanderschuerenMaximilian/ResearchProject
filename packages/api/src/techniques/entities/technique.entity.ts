import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Column, CreateDateColumn, Entity, ObjectIdColumn, UpdateDateColumn } from 'typeorm';

@Entity()
@ObjectType({description: 'Technique model'})
export class Technique {
  @ObjectIdColumn()
  @Field(() => ID)
  id: string;

  @Column()
  @Field(() => String)
  name: string;

  @Column()
  @Field(() => String)
  description: string;

  @Column()
  @Field(() => String, { nullable: true })
  image: string;

  @CreateDateColumn({ type: 'timestamp', nullable: true })
  @Field(() => Date)
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  @Field(() => Date)
  updatedAt: Date;
}
