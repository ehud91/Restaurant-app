import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TableModule } from './modules/table/table.module';
import { OrdersModule } from './modules/orders/order.module';

@Module({
  imports: [TableModule,
            OrdersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
