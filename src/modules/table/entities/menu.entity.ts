import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('menu')
export class MenuEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 100, nullable: true })
    menuId: string;

    @Column({ type: 'varchar', length: 100, nullable: true })
    menuTitle: string;

} 