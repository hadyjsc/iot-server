import { AbstractEntity } from "src/commons/entities/abstract.entity";
import { UserEntity } from "src/users/entities/user.entity";
import { BaseEntity, Column, Index, JoinColumn, OneToOne } from "typeorm"

export class AuthEntity extends BaseEntity implements AbstractEntity {
    public id: number;
    public uuid: string;
    public createdAt: Date;
    public updatedAt: Date;
    public deletedAt: Date;

    @OneToOne(
        () => UserEntity,
        (userEntity: UserEntity) => userEntity.id,
        { eager: true, nullable: true, onDelete: 'RESTRICT' }
    )
    @JoinColumn()
    @Index()
    @Column({ unique: true })
    user_id: UserEntity

    @Column({ type: 'tinyint', unique: true })
    otp: number

    @Column({ length: 255 })
    two_factor_secret: string

    @Column({ length: 255 })
    two_factor_recovery_code: string

    @Column({ type: 'text' })
    token: string
}
