import { MenuDto } from '../../table/dto/menu.model';


export class OrderDto {

    constructor(
        public id: string,
        public dishes: MenuDto[],
        public status: string,
        public totalPreparationTime: number, // In minutes
    ) {}
    

}

