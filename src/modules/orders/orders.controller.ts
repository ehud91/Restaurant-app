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


    @Post('/placeNewOrder')
    @HttpCode(Constatns.HTTP_OK)
    @UsePipes(ValidationPipe)
    placeNewOrder(@Body() orderRequest: OrderRequestDto) {

        try {
            const newOrder = this.ordersService.placeNewOrder(orderRequest);
            const response = new ApiResponseDto(
                Constatns.SUCCESS_TRUE, 
                ConstatnsOrders.OK_MESSAGE_CREATE_NEW_ORDER, 
                newOrder,
                Constatns.HTTP_OK);
            return response;
        } catch(error) {
            const response = new ApiResponseDto(
                Constatns.SUCCESS_FALSE, 
                ConstatnsOrders.FAILURE_MESSAGE_CREATE_NEW_ORDER, 
                [],
                Constatns.HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    @Get('/getOrders')
    @HttpCode(Constatns.HTTP_OK)
    async getOrders() {
        
        try {
            const ordersResult = await this.ordersService.getAllOrders();
            const response = new ApiResponseDto(
                Constatns.SUCCESS_TRUE, 
                ConstatnsOrders.OK_MESSAGE_GET_ALL_ORDERS, 
                ordersResult,
                Constatns.HTTP_OK);
        return response;
        } catch(error) {
            const response = new ApiResponseDto(
                Constatns.SUCCESS_FALSE, 
                ConstatnsOrders.FAILURE_MESSAGE_GET_ALL_ORDERS, 
                [],
                Constatns.HTTP_INTERNAL_SERVER_ERROR);
            return response;
        }
    }

    @Get('/getOrderById/:id')
    @HttpCode(Constatns.HTTP_OK)
    async getOrderById(@Param('id') orderId: string) {

        try {
            const orderResult = await this.ordersService.getOrderById(orderId);
            const response = new ApiResponseDto(
                Constatns.SUCCESS_TRUE, 
                ConstatnsOrders.OK_MESSAGE_GET_ORDER_BY_ID, 
                orderResult,
                Constatns.HTTP_OK);
            return response;
        } catch(error) {
            const response = new ApiResponseDto(
                Constatns.SUCCESS_FALSE, 
                ConstatnsOrders.FAILURE_MESSAGE_GET_ORDER_BY_ID, 
                [],
                Constatns.HTTP_INTERNAL_SERVER_ERROR);
            return response;
        }
    }



}