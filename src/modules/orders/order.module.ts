import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { orderUtils } from './orderUtils.module';

@Module({
    controllers: [OrdersController],
    providers: [OrdersService, orderUtils]
})

export class OrdersModule {}