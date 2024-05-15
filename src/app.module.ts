import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TableModule } from './modules/table/table.module';

@Module({
  imports: [TableModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
