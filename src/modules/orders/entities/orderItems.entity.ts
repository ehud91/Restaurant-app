import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('order_items') 
export class OrderItemsEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    itemId: string;

    @Column()
    orderId: string;
}