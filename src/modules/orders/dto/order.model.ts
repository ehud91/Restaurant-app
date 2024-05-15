import { MenuDto } from '../../table/dto/menu.model';


export class OrderDto {

    constructor(
        public id: string,
        public dishes: MenuDto[],
        public status: boolean,
        public totalPreparationTime: number, // In minutes
    ) {}
    

}

