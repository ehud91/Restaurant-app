import { 
    Body, 
    Controller,  
    Get, 
    Post, 
    Patch,
    Delete,
    Param,
    HttpCode, 
    UsePipes, 
    ValidationPipe, 
    Query} from '@nestjs/common';

import { KitchenService } from './kitchen.service';
import { OrderDto } from '../orders/dto/order.model';

@Controller('kitchen')
export class KitchenController {

    constructor(private kitchenService: KitchenService) {}

    @Post('/prepareOrder')
    prepareOrder(@Body() order: OrderDto) {

        this.kitchenService.prepareOrder(order);
    }
}