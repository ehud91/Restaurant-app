import { IsNotEmpty, Length, IsInt, Min, Max, IsEnum, IsArray, ArrayMinSize } from 'class-validator';
import { MenuDto } from '../../table/dto/menu.model';
import { MenuItemDto } from 'src/modules/table/dto/menuItem.model';


export class OrderRequestDto {

    @IsArray()
    @ArrayMinSize(1, { message: 'Order should have a one dish'})
    public dishes: MenuItemDto[];

}

