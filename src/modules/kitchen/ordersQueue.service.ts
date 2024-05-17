import { BadRequestException, Injectable } from "@nestjs/common";
import { OrderDto } from "../orders/dto/order.model";
import { v4 as uuidv4 } from 'uuid';


@Injectable()
export class OrdersQueueService {

    private ordersQueue: {id: string, orderId: string}[];
    private ordersQueueSize;

    constructor() {
        this.ordersQueue = [];
        this.ordersQueueSize = 0;
    }

    pushOrderToQueue(orderId: string) {
        const id = uuidv4();
        this.ordersQueue.push({id, orderId});
        this.ordersQueueSize++;
    }

    pullOrderFromQueue(): {id: string, orderId: string} {

        if(this.getOrderQueueSize() <= 0) { return null; }

        const orderFromQueue = this.ordersQueue[this.ordersQueueSize - 1];
        this.ordersQueueSize--;
        return orderFromQueue;
    }

    getOrderQueueSize(): number { return this.ordersQueueSize; }

    getAllItemsInQueue(): {id: string, orderId: string}[] { return this.ordersQueue; }
}