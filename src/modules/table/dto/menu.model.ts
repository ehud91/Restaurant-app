export class MenuDto {
    constructor(
        public id: string,
        public name: string,
        public price: number,
        public preparationTime: number, // In minutes

    ) {}
}