import { MenuDto } from '../table/dto/menu.model';

export class orderUtils { 

    public sumPreparationTime(dishes: MenuDto[]) {
        let sumPreparationTime: number = 0;
        for (let dish of dishes) { sumPreparationTime += dish.preparationTime; }
        return sumPreparationTime;
    }
}