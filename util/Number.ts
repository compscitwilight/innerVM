export class Number2 extends Number {
    public constructor(
        public value: number
    ) {
        super(value);
    }

    public abbreviate() {
        return this.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");  
    }
}