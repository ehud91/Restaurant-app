
export class CreateMenuItemDto {
    
    constructor(public menuId: string,
                public name: string,
                public price: number,
                public preparationTime: number) {}
}