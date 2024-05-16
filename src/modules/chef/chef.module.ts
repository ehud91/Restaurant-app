import { Module } from '@nestjs/common';
import { ChefController } from './chef.controller';
import { ChefService } from './chef.service';

@Module({
    controllers: [ChefController],
    providers: [ChefService]
})

export class ChefModule {}