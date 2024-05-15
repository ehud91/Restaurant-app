import { MenuDto } from '../../table/dto/menu.model';
import { StatusTypeDto } from './statusTypeDto.model';


export class OrderDto {

    constructor(
        public id: string,
        public dishes: MenuDto[],
        public status: string,
        public totalPreparationTime: number, // In minutes
    ) {}
    

}

