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
import { Constatns } from '../const/consts.model';
import { OrdersService } from './orders.service';
import { OrderRequestDto } from './dto/orderRequest.model';
import { ApiResponseDto } from './dto/apiResponse.model';
import { ConstatnsOrders } from './const/const.model';

@Controller('/orders')
export class OrdersController {
    
    constructor(private ordersService: OrdersService) {}


    @Post('/createNewOrder')
    @HttpCode(Constatns.HTTP_OK)
    @UsePipes(ValidationPipe)
    createNewOrder(@Body() orderRequest: OrderRequestDto) {

        const newOrder = this.ordersService.createNewOrder(orderRequest);
        const response = new ApiResponseDto(
            Constatns.SUCCESS_TRUE, 
            ConstatnsOrders.OK_MESSAGE_CREATE_NEW_ORDER, 
            newOrder,
            Constatns.HTTP_OK);
        return response;
    }

    @Get('/getOrders')
    @HttpCode(Constatns.HTTP_OK)
    getOrders() {
        
        const ordersResult = this.ordersService.getAllOrders();

        const orders = [];
        ordersResult.forEach(order => { orders.push(order); });
        const response = new ApiResponseDto(
            Constatns.SUCCESS_TRUE, 
            ConstatnsOrders.OK_MESSAGE_GET_ALL_ORDERS, 
            orders,
            Constatns.HTTP_OK);
        return response;
    }

    @Get('/getOrderById/:id')
    @HttpCode(Constatns.HTTP_OK)
    getOrderById(@Param('id') orderId: string) {

        const orderResult = this.ordersService.getOrder(orderId);
        const response = new ApiResponseDto(
            Constatns.SUCCESS_TRUE, 
            ConstatnsOrders.OK_MESSAGE_GET_ORDER_BY_ID, 
            orderResult,
            Constatns.HTTP_OK);
        return response;
    }



}