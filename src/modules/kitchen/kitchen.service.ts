import { BadRequestException, Injectable } from "@nestjs/common";
import { OrderDto } from "../orders/dto/order.model";

@Injectable() 
export class KitchenService {

    prepareOrder() {

        // should prepare the order
        console.log('called to prepareOrder() method ');
    }
}