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
    ValidationPipe } from '@nestjs/common';

import { WaiterService } from './waiter.service';
import { Constatns } from '../const/consts.model';

@Controller('waiter')
export class WaiterController {

    constructor(private waiterService: WaiterService) {}

    @Get('/supplyOrderToTable')
    @HttpCode(Constatns.HTTP_OK)
    supplyOrderToTable() {

        this.waiterService.supplyOrderToTable();
    }
}