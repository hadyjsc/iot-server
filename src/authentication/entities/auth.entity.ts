import { AbstractEntity } from "src/commons/entities/abstract.entity";
import { UserEntity } from "src/users/entities/user.entity";
import { BaseEntity, Column, CreateDateColumn, DeleteDateColumn, Entity, Generated, Index, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm"

@Entity({ name: 'authentications' })
export class AuthEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    @PrimaryColumn()
    public id: number;

    @Column()
    @Generated("uuid")
    public uuid: string;

    @OneToOne(
        () => UserEntity,
        { eager: true, nullable: true, onDelete: 'RESTRICT' }
    )
    @JoinColumn({name: 'user_id', referencedColumnName: 'id'})
    @Index()
    user_id: UserEntity

    @Column({ type: 'tinyint', unique: true })
    otp: number

    @Column({ length: 255 })
    two_factor_secret: string

    @Column({ length: 255 })
    two_factor_recovery_code: string

    @Column({ type: 'text' })
    token: string

    @Column({ type: 'text' })
    refresh_token: string

    @CreateDateColumn()
    public createdAt: Date;

    @UpdateDateColumn()
    public updatedAt: Date;

    @DeleteDateColumn()
    public deletedAt: Date;
}
