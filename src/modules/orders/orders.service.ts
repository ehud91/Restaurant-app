import { BadRequestException, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { OrderRequestDto } from './dto/orderRequest.model';
import { OrderDto } from "./dto/order.model";
import { v4 as uuidv4 } from 'uuid';
import { StatusTypeDto } from './dto/statusTypeDto.model';
import { orderUtils } from "./orderUtils.module";
import { DataSource } from "typeorm";
import { OrderEntity } from "./entities/order.entity";
import { OrderItemsEntity } from './entities/orderItems.entity'; 


@Injectable() 
export class OrdersService {

    private ordersRepository;
    private ordersItemsRepository;

    orders = new Map<String, OrderDto>();

    constructor(private orderUtils: orderUtils, private dataSource: DataSource) {
        this.ordersRepository = dataSource.getRepository(OrderEntity);
        this.ordersItemsRepository = dataSource.getRepository(OrderItemsEntity);
    }


    async placeNewOrder(orderRequest: OrderRequestDto) {
    
        const newOrder = new OrderEntity();
        newOrder.orderId = uuidv4();
        
        const orderItemsCollection = this.placeOrderItems(newOrder, orderRequest);

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


    private placeOrderItems(newOrder: OrderEntity,orderRequest: OrderRequestDto) {
        const orderItemsCollection = [];
        for(let dish of orderRequest.dishes) {
            const newOrderItems = new OrderItemsEntity();
            newOrderItems.itemId = dish.itemId;
            newOrderItems.orderId = newOrder.orderId;
        }
        return orderItemsCollection;
    }

    getAllOrders() {
    
        //this.orde
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

    getOrder(orderId: string) {
        if (orderId === '') { return []; }
        const order = this.orders.get(orderId);
        return (typeof(order) === 'object') ? order : [];
    }
}