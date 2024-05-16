import { IsArray, ArrayMinSize } from 'class-validator';
import { MenuItemDto } from 'src/modules/table/dto/menuItem.model';


export class OrderRequestDto {

    @IsArray()
    @ArrayMinSize(1, { message: 'Order should have a one dish'})
    public dishes: MenuItemDto[];

}

