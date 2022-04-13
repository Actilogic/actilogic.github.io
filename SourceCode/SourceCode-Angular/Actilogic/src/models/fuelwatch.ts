// to create a model class, we first need to create a new file
//f.e person.ts

export class Fuelwatch {
    constructor(
        public name: string,
        public lastName: string,
        public age: number

    ) { }
}

//now that we have the model class we can create arrays that contain fuelwatch class elements
public FuelwatchFeed: Fuelwatch[]{ 
    
}
// constructor(){
//     this.people = [
//         new Person('Carla', 'Smith', 20),
//         new Person('Carlos', 'Smith', 25),
//         new Person('Andrea', 'Johnson', 23),

//     ];
// }