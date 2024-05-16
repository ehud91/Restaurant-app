export class MenuItemDto {
    constructor(
        public menuId: string,
        public itemId: string,
        public name: string,
        public price: number,
        public preparationTime: number, // In minutes

    ) {}
}