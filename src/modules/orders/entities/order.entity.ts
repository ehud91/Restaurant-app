import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum StatusTypeDto {
    CREATED = 'Created',
    PENDING = 'Pending',
    READY = 'Ready'
} 

@Entity('orders') 
export class OrderEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 100, nullable: true })
    orderId: string;

    @Column({ type: 'varchar', length: 20, nullable: true })
    status: StatusTypeDto;

    @Column({ type: 'decimal', nullable: true })
    preparationTime: number;
}