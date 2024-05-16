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
import { ConstatnsTable } from './const/const.model';
import { TableService } from './table.service';
import { ApiResponseDto } from './dto/apiResponse.model';


    @Controller('table')
    export class TableController {

        constructor(private tableService: TableService) {}

        @Get('/displayAllMenus')
        @HttpCode(Constatns.HTTP_OK)
        async displayAllMenus() {
            try {
                const menusWithProducts = await this.tableService.getAllMenusWithProducts();
                const response = new ApiResponseDto(
                                Constatns.SUCCESS_TRUE, 
                                ConstatnsTable.OK_MESSAGE_GET_ALL_PRODUCTS, 
                                menusWithProducts,
                                Constatns.HTTP_OK);
                return response;
            } catch(error) {
                const response = new ApiResponseDto(
                    Constatns.SUCCESS_FALSE, 
                    ConstatnsTable.FAILURE_MESSAGE_GET_ALL_PRODUCTS, 
                    [],
                    Constatns.HTTP_INTERNAL_SERVER_ERROR);
            } 
        }

        @Get('/displayMenuById/:id')
        @HttpCode(Constatns.HTTP_OK)
        async displayMenuById(@Param('id') id: string) {
    
            try {
                const menuWithProducts = await this.tableService.getMenuWithProductsById(id);
                const response = new ApiResponseDto(
                                Constatns.SUCCESS_TRUE, 
                                ConstatnsTable.OK_MESSAGE_GET_ALL_PRODUCTS, 
                                menuWithProducts,
                                Constatns.HTTP_OK);
                return response;
            } catch(error) {
                const response = new ApiResponseDto(
                    Constatns.SUCCESS_FALSE, 
                    ConstatnsTable.FAILURE_MESSAGE_GET_ALL_PRODUCTS, 
                    [],
                    Constatns.HTTP_INTERNAL_SERVER_ERROR);
            } 
        }

    }