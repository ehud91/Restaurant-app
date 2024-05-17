import { BadRequestException, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { OrderRequestDto } from './dto/orderRequest.model';
import { OrderDto } from "./dto/order.model";
import { v4 as uuidv4 } from 'uuid';
import { orderUtils } from "./orderUtils.module";
import { DataSource } from "typeorm";
import { OrderEntity } from "./entities/order.entity";
import { OrderItemsEntity } from './entities/orderItems.entity'; 
import { StatusTypeDto } from './entities/order.entity';


@Injectable() 
export class OrdersService {

    private ordersRepository;
    private ordersItemsRepository;

    orders = new Map<String, OrderDto>();

    constructor(private orderUtils: orderUtils, 
                private dataSource: DataSource) {
        this.ordersRepository = dataSource.getRepository(OrderEntity);
        this.ordersItemsRepository = dataSource.getRepository(OrderItemsEntity);
    }


    async placeNewOrder(orderRequest: OrderRequestDto) {
    
        const newOrder = new OrderEntity();
        newOrder.orderId = uuidv4();
        newOrder.status = StatusTypeDto.CREATED;
        
        
        const orderItemsCollection = this.placeOrderItems(newOrder, orderRequest);
        newOrder.preparationTime = this.orderUtils.sumTotalPreparationTime(orderRequest);

        try {
            await this.ordersRepository.save(newOrder);  
        } catch(error) {
            throw new HttpException('Could not save new order', HttpStatus.INTERNAL_SERVER_ERROR);
        }

        try {
            await this.ordersItemsRepository.save(orderItemsCollection);
        } catch(error) {
            throw new HttpException('Could not save new order items', HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return {
            "newOrder": newOrder,
            "newOrderItems": orderItemsCollection
        };
    }


    async updateOrder(order: OrderEntity) {

        try {
            await this.ordersRepository.update(order.id, order);
        } catch(error) {
            throw new HttpException('Could not update the order', HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return order;
    }


    async getAllOrders() {
    
        const ordersCollection = [];
        const orders: OrderEntity[] = await this.ordersRepository.find();

        for (let order of orders) {
            const items: OrderItemsEntity[] = await this.ordersItemsRepository.find({
                where: { "orderId": order.orderId }
            });

            ordersCollection.push({
                "order": order,
                "orderItens": items
            });
        }
        return ordersCollection;
    }

    async getOrderById(orderId: string) { 

        const order: OrderEntity = await this.ordersRepository.findOne(
            { where: { "orderId": orderId }});
        
        if (order === null) { return [] };
        
        const orderItems: OrderItemsEntity[] = await this.getAllItemsByOrder(order);

        return {
            "order": order,
            "orderItems": orderItems
        };
    }

    async getTheFirstPlacedOrder() { 

        const order: OrderEntity = await this.ordersRepository.findOne(
            { where: { "status": StatusTypeDto.CREATED }});

        if (order === null) { return null };

        const orderItems: OrderItemsEntity[] = await this.getAllItemsByOrder(order);

        return {
            "order": order,
            "orderItems": orderItems
        }; 
    }


    private placeOrderItems(newOrder: OrderEntity,orderRequest: OrderRequestDto) {
        const orderItemsCollection = [];
        for(let dish of orderRequest.dishes) {
            const newOrderItems = new OrderItemsEntity();
            newOrderItems.itemId = dish.itemId;
            newOrderItems.orderId = newOrder.orderId;
            orderItemsCollection.push(newOrderItems);
        }
        return orderItemsCollection;
    }

    private async getAllItemsByOrder(order: OrderEntity): Promise<OrderItemsEntity[]> {

        const items: OrderItemsEntity[] = await this.ordersItemsRepository.find(
            { where: { "orderId": order.orderId }});
        return items;

        
    }


    /*
    createNewOrder(orderRequest: OrderRequestDto) {

        if (orderRequest === undefined && orderRequest.dishes.length <= 0) {
            throw new BadRequestException('At least one dish or more are required for an order');
        }

        const id: string = uuidv4();
        
        const totalPreparationTime = 
            this.orderUtils.sumPreparationTime(orderRequest.dishes);

        const newOrder = new OrderDto(
            id,
            orderRequest.dishes,
            StatusTypeDto.STARTED,
            totalPreparationTime
            );
        this.orders.set(id, newOrder); 
        return newOrder;   
    }
    */

    /*
    getAllOrders() {

        return this.orders;
    }
    */

    /*
    getOrder(orderId: string) {
        if (orderId === '') { return []; }
        const order = this.orders.get(orderId);
        return (typeof(order) === 'object') ? order : [];
    }
    */
}