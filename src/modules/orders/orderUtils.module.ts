import { OrderRequestDto } from './dto/orderRequest.model';

export class orderUtils { 

    public sumTotalPreparationTime(orderRequest: OrderRequestDto) {
        let sumPreparationTime: number = 0;
        
        for (let dish of orderRequest.dishes) { sumPreparationTime += dish.preparationTime; }
        return sumPreparationTime;
    }
}