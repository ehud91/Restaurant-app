import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('menu_items')
export class MenuItemsEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 100, nullable: true})
    itemId: string;

    @Column({ type: 'varchar', length: 100, nullable: true})
    menuId: string;
    
    @Column({ type: 'decimal', nullable: true })
    price: number;

    @Column({ type: 'varchar', length: 200, nullable: true})
    name: string;

    @Column({ type: 'decimal', nullable: true })
    preparationTime: number;
}