import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TableModule } from './modules/table/table.module';
import { OrdersModule } from './modules/orders/order.module';
import { KitchenModule } from './modules/kitchen/kitchen.module';
import { ChefModule } from './modules/chef/chef.module';
import { WaiterModule } from './modules/waiter/waiter.module';
import { TypeOrmModule } from './datasource/typeorm.module';

@Module({
  imports: [TypeOrmModule,
            TableModule,
            OrdersModule,
            KitchenModule,
            ChefModule,
            WaiterModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
