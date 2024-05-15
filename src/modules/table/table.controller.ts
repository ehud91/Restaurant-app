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

        @Get('/displayMenu')
        @HttpCode(Constatns.HTTP_OK)
        displayMenu() {
            const menuProducts = this.tableService.getMenuProducts();
            const response = new ApiResponseDto(
                            Constatns.SUCCESS_TRUE, 
                            ConstatnsTable.OK_MESSAGE_ADD_EMPLOYEE, 
                            menuProducts,
                            Constatns.HTTP_OK);
            return response;
        }

    }