import { BadRequestException, Injectable } from "@nestjs/common";
import { OrderDto } from "../orders/dto/order.model";

@Injectable() 
export class KitchenService {

    prepareOrder(order: OrderDto) {

        // should prepare the order
    }
}