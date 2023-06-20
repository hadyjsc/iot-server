import { Exclude } from "class-transformer";
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Generated,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

export abstract class AbstractEntity {
  @PrimaryGeneratedColumn()
  @PrimaryColumn()
  @Exclude()
  public id: number;

  @Column()
  @Generated("uuid")
  public uuid: string;

  @CreateDateColumn()
  @Exclude()
  public createdAt: Date;

  @UpdateDateColumn()
  @Exclude()
  public updatedAt: Date;

  @DeleteDateColumn()
  @Exclude()
  public deletedAt: Date;
}