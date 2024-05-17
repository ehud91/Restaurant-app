import { BadRequestException, Injectable } from "@nestjs/common";
import { OrderDto } from "../orders/dto/order.model";
import { OrdersService } from "../orders/orders.service";
import { OrderEntity, StatusTypeDto } from "../orders/entities/order.entity";
import { OrdersQueueService } from "./ordersQueue.service";
import { OrderItemsEntity } from "../orders/entities/orderItems.entity";
import { MenuDto } from "../table/dto/menu.model";

@Injectable() 
export class KitchenService {

    constructor(private ordersService: OrdersService, 
                private ordersQueueService: OrdersQueueService) {}

    async prepareOrder() {

        const orderRes = await this.ordersService.getTheFirstPlacedOrder();

        if (orderRes === null) { return; }
        
        // Change order status to PENDING
        orderRes.order = this.changeOrderStatus(orderRes.order);

         // Update the order status in Database
        await this.ordersService.updateOrder(orderRes.order);

        // push new order to a Queue
        this.ordersQueueService.pushOrderToQueue(orderRes.order.orderId);
        
        const queueItems = this.ordersQueueService.getAllItemsInQueue();
        console.log('queue Items: ', queueItems);
        
        //await this.ordersService.updateOrder(order);
        
        // should prepare the order
        console.log('called to prepareOrder() method ');
    }

    private changeOrderStatus(order: OrderEntity): OrderEntity {
        order.status = StatusTypeDto.PENDING;
        return order;
    }
}