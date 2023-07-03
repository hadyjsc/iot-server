import { BaseEntity, Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity("privileges")
export class Privilege extends BaseEntity {
    @PrimaryGeneratedColumn()
    @PrimaryColumn()
    id: number;

    @Column({ length: 50 })
    uuid: string

    @Column({ type: 'bigint', unsigned: true })
    user_id: number

    @Column({ type: 'bigint', unsigned: true })
    permission_id: number

    @Column({ default: true })
    is_active: boolean

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
