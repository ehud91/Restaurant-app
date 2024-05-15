import { Injectable, NotFoundException } from "@nestjs/common";
import { v4 as uuidv4 } from 'uuid';
import { MenuDto } from "./dto/menu.model";

@Injectable() 
export class TableService {

    menu = new Map<String, MenuDto>();

    getMenuProducts() {

        this.insertAllproductsToMenu();

        const menuProductsList = [];
        for (let menuProduct of this.menu.values()) { menuProductsList.push(menuProduct); }

        return menuProductsList;
    }

    private insertProductToMenu(
        name: string, 
        price: number, 
        preparationTime: number) {
            const id: string = uuidv4();
            const newMenu = new MenuDto(
                id,
                name,
                price,
                preparationTime);
            this.menu.set(id, newMenu);
                
    }

    private insertAllproductsToMenu() {
        this.insertProductToMenu('Soup: Creamy Tomato Bisque with a Parmesan Crisp', 7.9, 30);
        this.insertProductToMenu('Salad: Chopped Kale Sald with Feta Cheese', 5.2, 10);
        this.insertProductToMenu('Pizza: Margarita Pizza with Fresh Mozzarella', 6.5, 15);
    }
    
}