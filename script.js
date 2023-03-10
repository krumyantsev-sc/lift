const maxFloor = 5;
let peopleNum = 10;
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
            this.people.push(new Human(random));
        }
    }
}

class Human {
    constructor(targetFloor) {
        this.targetFloor = targetFloor;
    }
}

class Building {
    floors = [];
    allPeople = peopleNum;
    init() {
        for(let i = 0; i < maxFloor - 1; i++) {
            let randomPeople = getRandomInt(0,this.allPeople + 1);
            let floor = new Floor(i,randomPeople);
            floor.fill();
            this.floors.push(floor);
            this.allPeople -= randomPeople;
        }
        let lastFloor = new Floor(maxFloor - 1,this.allPeople);
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
    direction = 1;
    currPpl = 0;
    constructor(currentFloor) {
        this.currentFloor = currentFloor;
    }
    pressedButtons = [];
    fill(house) {
        if(this.currPpl < 6) {
            if(house.floors[this.currentFloor].people.length > 0) {
                let availableSpace = this.maxPeople - this.currPpl;
                while(availableSpace > 0) {
                    if(house.floors[this.currentFloor].people.length > 0) {
                        let temp = house.floors[this.currentFloor].people.pop();
                        house.floors[this.currentFloor].numberOfPeople--;
                        this.pressedButtons.push(temp.targetFloor);
                        this.currPpl++;
                        availableSpace--;
                        if (house.floors[this.currentFloor].people.length === 0) {
                            break;
                        }
                    }
                }
            }
        }
        console.log("Лифт заполнен");
        console.log(this.pressedButtons);
    }

    moveDir() {
        console.log("Перемещение");
        if (this.currentFloor === maxFloor-1) {
            this.direction = -1;
        }
        if (this.currentFloor === 0) {
            this.direction = 1;
        }
        if (this.direction > 0) {
            this.currentFloor++;
        } else {
            this.currentFloor--;
        }
    }

    letOut() {
            let counter = 0;
            label: while(this.pressedButtons.indexOf(this.currentFloor) !== -1) {
            for (let i = 0; i < this.pressedButtons.length; i++) {
                if (this.currentFloor === this.pressedButtons[i]) {
                    this.pressedButtons.splice(i,1);
                    counter++;
                    peopleNum--;
                    this.currPpl--;
                    continue label;
                }
            }
        }
            console.log(`Вышло ${counter} человек на ${this.currentFloor} этаже`);
    }
}

let house = new Building();
house.init();
display(house);
let lift = new Lift(0);
while(peopleNum !== 0) {
    lift.letOut();
    lift.fill(house);
    lift.moveDir();
    display(house);
}
