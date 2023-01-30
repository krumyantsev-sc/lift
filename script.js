const maxFloor = 5;

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}

class Floor {
    people = [];
    constructor(number, numberOfPeople) {
        this.number = number;
        this.numberOfPeople = numberOfPeople;
    }
    fill() {
        let random;
        for(let i = 0; i < this.numberOfPeople; i++) {
            do {
                random = getRandomInt(0,maxFloor);
            } while (random === this.number);
            this.people.push(new human(random));
        }
    }
}

class human {
    constructor(targetFloor) {
        this.targetFloor = targetFloor;
    }
}

class building {
    floors = [];

    init() {
        let allPeople = 10;
        for(let i = 0; i < maxFloor - 1; i++) {
            let randomPeople = getRandomInt(0,allPeople + 1);
            let floor = new Floor(i,randomPeople);
            floor.fill();
            this.floors.push(floor);
            allPeople -= randomPeople;
        }
        let lastFloor = new Floor(maxFloor - 1,allPeople);
        lastFloor.fill();
        this.floors.push(lastFloor);
    }
}

function display(house) {
    for (let item of house.floors) {
        console.log(`Этаж: ${item.number} Людей:${item.numberOfPeople}`);
        for (let it of item.people) {
            console.log(`Цель: ${it.targetFloor}`);
        }
    }
}

class Lift {
    maxPeople = 6;
    constructor(currentFloor) {
        this.currentFloor = currentFloor;
    }
    target;
    pressedButtons = [];
}

let house = new building();
house.init();
//console.log(house);
display(house);