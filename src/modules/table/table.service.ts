import { HttpException, HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { v4 as uuidv4 } from 'uuid';
import { MenuDto } from "./dto/menu.model";
import { MenuItemDto } from "./dto/menuItem.model";
import { DataSource } from "typeorm";
import { MenuEntity } from "./entities/menu.entity";
import { MenuItemsEntity } from "./entities/menuItems.entity";
import { CreateMenuItemDto } from "./dto/createItemMenu.model";
import { CreateMenuDto } from "./dto/CreateMenu.model";

@Injectable() 
export class TableService {

    private menuRepository;
    private menuItemRepository;

    menu = new Map<String, MenuDto>();

    constructor(private dataSource: DataSource) {
        this.menuRepository = dataSource.getRepository(MenuEntity);
        this.menuItemRepository = dataSource.getRepository(MenuItemsEntity);

        //this.autoInitMenu();
    }

    async getAllMenusWithProducts() {
      
        const resAllMenus: MenuEntity[] = await this.menuRepository.find();
        if (resAllMenus.length < 1) { return [] };

        return await this.collectMenuItems(resAllMenus);
    }

    async getMenuWithProductsById(menuId: string) {
    
        const resMenu: MenuEntity = await this.menuRepository.findOne(
            { where: { menuId: menuId} }
        );
        if (resMenu === null) { return [] };

        const collectionMenu: MenuEntity[] = [resMenu];

        return await this.collectMenuItems(collectionMenu);
    }

    /*
    getMenuProducts() {
        const menuProductsList = [];
        for (let menuProduct of this.menu.values()) { menuProductsList.push(menuProduct); }
        return menuProductsList;
    }
    */

    async placeMenu(menu: CreateMenuDto): Promise<MenuEntity> { 

        try {
            return await this.menuRepository.save(this.createNewMenu(menu));
        } catch(error) {
            console.log(error);
            throw new HttpException('Item is already exist', HttpStatus.CONFLICT);
        }
    }

    
    async insertItemsToMenu(menuItem: CreateMenuItemDto): Promise<MenuItemsEntity> {

        try {
            return await this.menuItemRepository.save(this.createNewMenuItem(menuItem));
        } catch(error) {
            console.log(error);
            throw new HttpException('Item is already exist', HttpStatus.CONFLICT);
        }
    }

    private async collectMenuItems(resMenu: MenuEntity[]) {
        
        const menusWithItems = [];

        for(let menuItem of resMenu) {
            const resItemsMenu: MenuItemsEntity[] = await this.menuItemRepository.find({ 
                where: { menuId: menuItem.menuId }});
 
            menusWithItems.push({ 'menuInfo': menuItem, 'menuItems': resItemsMenu });
        }
        return menusWithItems;
    }

    private async autoInitMenu() {
        const menu = await this.initMenu();
        await this.initAllproductsToMenu(menu);
    }

    private createNewMenu(createMenuItem: CreateMenuDto) {
        const newMenuItem: MenuEntity = new MenuEntity();
        newMenuItem.menuId = uuidv4();
        newMenuItem.menuTitle = createMenuItem.title;
        return newMenuItem
    }

    private createNewMenuItem(createMenuItem: CreateMenuItemDto) {
        const newMenuItem: MenuItemsEntity = new MenuItemsEntity();
        newMenuItem.itemId = uuidv4();
        newMenuItem.menuId = createMenuItem.menuId;
        newMenuItem.name = createMenuItem.name;
        newMenuItem.price = createMenuItem.price;
        newMenuItem.preparationTime = createMenuItem.preparationTime;
        return newMenuItem
    }

    private async initMenu(): Promise<MenuDto> {
        const menu: MenuEntity = await this.placeMenu(new CreateMenuDto('Breakfast menu'));
        return new MenuDto(menu.menuId, menu.menuTitle)
    }

    private async initAllproductsToMenu(menuDto: MenuDto) {
        await this.insertItemsToMenu(
            new CreateMenuItemDto(menuDto.id, 'Soup: Creamy Tomato Bisque with a Parmesan Crisp', 7.4, 3));
        await this.insertItemsToMenu(
            new CreateMenuItemDto(menuDto.id, 'alad: Chopped Kale Sald with Feta Cheese', 5.2, 10));
        await this.insertItemsToMenu(
            new CreateMenuItemDto(menuDto.id, 'Pizza: Margarita Pizza with Fresh Mozzarella', 5.2, 10));        
    }    
    

    /*
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
    */

    /*
    private insertAllproductsToMenu() {
        this.insertProductToMenu('Soup: Creamy Tomato Bisque with a Parmesan Crisp', 7.9, 30);
        this.insertProductToMenu('Salad: Chopped Kale Sald with Feta Cheese', 5.2, 10);
        this.insertProductToMenu('Pizza: Margarita Pizza with Fresh Mozzarella', 6.5, 15);
    }
    */
    
}