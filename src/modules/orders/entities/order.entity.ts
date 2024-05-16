import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('orders') 
export class OrderEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 100, nullable: true })
    orderId: string;

    @Column({ type: 'decimal', nullable: true })
    preparationTime: number;
}