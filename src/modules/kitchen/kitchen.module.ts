import { Module } from '@nestjs/common';
import { KitchenController } from './kitchen.controller';
import { KitchenService } from './kitchen.service';
import { OrdersQueueService } from './ordersQueue.service';
import { OrdersService } from '../orders/orders.service';
import { orderUtils } from '../orders/orderUtils.module';

@Module({
    controllers: [KitchenController],
    providers: [KitchenService,
                OrdersQueueService, 
                OrdersService, 
                orderUtils]
})

export class KitchenModule {}