export class Contact {
    public id: number;
    constructor(
        public name: string,
        public phone: number,
        public email: string,
        public birthday: Date, ) { }
}