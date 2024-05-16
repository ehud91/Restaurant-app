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

import { ChefService } from './chef.service';  
import { Constatns } from '../const/consts.model'

@Controller('chef') 
export class ChefController {

    constructor(private chefService: ChefService) {}

    @Post('/prepareOrderDishes')
    @HttpCode(Constatns.HTTP_OK)
    prepareOrderDishes() {
        
        this.chefService.prepareOrderDishes();
    }
} 