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
import { Constatns } from '../const/consts.model';

@Controller('kitchen')
export class KitchenController {

    constructor(private kitchenService: KitchenService) {}

    @Get('/prepareOrder')
    @HttpCode(Constatns.HTTP_OK)
    prepareOrder() {

        this.kitchenService.prepareOrder();
        return {};
    }
}