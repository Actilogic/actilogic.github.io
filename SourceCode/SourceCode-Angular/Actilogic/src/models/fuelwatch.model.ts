// to create a model class, we first need to create a new file
//f.e person.ts

class Fuelwatch {
    constructor(
        public name: string,
        public lastName: string,
        public age: number

    ) { }
}

//now that we have the model class we can create arrays that contain fuelwatch class elements
export {
    Fuelwatch
}