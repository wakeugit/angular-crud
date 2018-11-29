export class Contact {
    public id: number;
    constructor(
        public name: string,
        public countryId: number,
        public phone: number,
        public email: string,
        public birthday: Date, ) { }
}