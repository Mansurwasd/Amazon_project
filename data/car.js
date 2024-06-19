export class Car {
    #brand;
    #model;
    speed = 0;
    isTrunkOpen = true;
    constructor(carBrand, carModel) {
        this.#brand = carBrand;
        this.#model = carModel;
    };
    method1() {
        console.log(`${this.#brand} ${this.#model} ${this.speed}`)
    }
    go() {
        if (this.speed <= 195 && !this.isTrunkOpen) {
            this.speed += 5;
        }
        
    }
    brake() {
        if (this.speed >= 5) {
            this.speed -= 5;
        }
    }
    openTrunk() {
        if (this.speed === 0) {
            this.isTrunkOpen = true;
        }
    }
    closeTrunk() {
        this.isTrunkOpen = false;
    }
};
const object1 = new Car('Toyota', 'Corolla');
object1.method1()
const object2 = new Car('Tesla', 'Model 3');
object2.method1()

export class RaceCar extends Car {
    acceleration;
    constructor(carBrand, carModel, carAcceleration) {
        super(carBrand, carModel);
        this.acceleration = carAcceleration;
    }
    go() {
        if (this.speed <= 280) {
            this.speed += this.acceleration;
        }
    }
    openTrunk() {
        
    }
    closeTrunk() {
        
    }
}
const object3 = new RaceCar('McLaren', 'F1', 20);
object3.go();
object3.method1();