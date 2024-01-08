import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Column, CreateDateColumn, Entity, ObjectIdColumn, UpdateDateColumn } from 'typeorm';

@Entity()
@ObjectType({ description: 'Kata model'})
export class Kata {
  @ObjectIdColumn()
  @Field(() => ID)
  id: number;

  @Column()
  @Field(() => String)
  name: string;

  @Column()
  @Field(() => String)
  description: string;

  @Column()
  @Field(() => String, { nullable: true })
  code: string;

  @CreateDateColumn({ type: 'timestamp', nullable: true })
  @Field(() => Date)
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  @Field(() => Date)
  updatedAt: Date;
}
