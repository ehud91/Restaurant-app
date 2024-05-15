import { BadRequestException, Injectable } from "@nestjs/common";
import { OrderRequestDto } from './dto/orderRequest.model';
import { OrderDto } from "./dto/order.model";
import { v4 as uuidv4 } from 'uuid';
import { StatusTypeDto } from './dto/statusTypeDto.model';
import { orderUtils } from "./orderUtils.module";


@Injectable() 
export class OrdersService {

    constructor(private orderUtils: orderUtils) {}


    orders = new Map<String, OrderDto>();

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

    getAllOrders() {

        return this.orders;
    }

    getOrder(orderId: string) {
        if (orderId === '') { return []; }
        const order = this.orders.get(orderId);
        return (typeof(order) === 'object') ? order : [];
    }
}