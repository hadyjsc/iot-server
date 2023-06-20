import { UserEntity } from "src/users/entities/user.entity";
import { BaseEntity, Column, CreateDateColumn, DeleteDateColumn, UpdateDateColumn, Entity, PrimaryColumn, PrimaryGeneratedColumn, OneToMany } from "typeorm";

@Entity({ name: 'roles' })
export class RoleEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    @PrimaryColumn()
    id: number;
    
    @Column({ length: 50 })
    uuid: string

    @Column({ length: 100 })
    name: string

    @Column({ length: 100 })
    alias: string

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

    @OneToMany(() => UserEntity, (user) => user.role)
    user: UserEntity
}
