import { UserStatusInt } from "src/commons/enum";
import { RoleEntity } from "src/roles/entities/role.entity";
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BaseEntity, DeleteDateColumn, OneToOne, JoinColumn, Index, PrimaryColumn } from "typeorm";
@Entity({ name: 'users' })
export class UserEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    @PrimaryColumn()
    id: number;

    @Column({ length: 50})
    uuid: string

    @Column({ length: 255 })
    first_name: string;

    @Column({ length: 255 })
    middle_name: string;

    @Column({ length: 255 })
    last_name: string;

    @Column({ length: 255 })
    email: string;

    @Column({ length: 255 })
    password: string

    @OneToOne(
        () => RoleEntity,
        { eager: true, nullable: true, onDelete: 'RESTRICT' }
    )
    @JoinColumn()
    role: RoleEntity

    @Column({
        enum: UserStatusInt,
        type: 'enum',
        default: UserStatusInt.REGISTERED
    })
    status: UserStatusInt

    @CreateDateColumn()
    created_at: Date

    @Column({ type: 'bigint', unsigned: true })
    created_by: number

    @UpdateDateColumn()
    updated_at: Date

    @Column({ type: 'bigint', unsigned: true })
    updated_by: number

    @DeleteDateColumn()
    deleted_at: Date

    @Column({ type: 'bigint', unsigned: true })
    deleted_by: number
}
