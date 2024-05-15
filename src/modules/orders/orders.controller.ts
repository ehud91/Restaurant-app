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
import { Constatns } from '../const/consts.model';


@Controller('orders')
export class Orders {
    
}