import { IsNotEmpty, Length, IsInt, Min, Max, IsEnum, IsArray, ArrayMinSize } from 'class-validator';
import { MenuDto } from '../../table/dto/menu.model';


export class OrderRequestDto {

    @IsArray()
    @ArrayMinSize(2, { message: 'Order should have a one dish'})
    public dishes: MenuDto[];

}

