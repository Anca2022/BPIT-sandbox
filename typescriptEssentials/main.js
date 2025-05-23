"use strict";
class Animal {
    constructor({ name, nationality, age }) {
        this._name = name;
        this._age = age ?? name.length * 2;
        this._nationality = nationality;
    }
    get name() {
        return this._name;
    }
    get age() {
        return this._age;
    }
    get characteristics() {
        return `${this._name} is ${this._age} years old and it's nationality is: ${this._nationality}`;
    }
}
class Dog extends Animal {
    move() {
        return "zooming";
    }
    makeSound() {
        return `wof-wof`;
    }
    get characteristics() {
        return `${super.characteristics}; it's a dog`;
    }
}
class Horse extends Animal {
    move() {
        return "galloping";
    }
    makeSound() {
        return `neight`;
    }
    get characteristics() {
        return `${super.characteristics}; it's a horse`;
    }
}
class Fish extends Animal {
    //doesn't makeSound
    move() {
        return `swimming`;
    }
    get characteristics() {
        return `${super.characteristics}; it's a fish`;
    }
}
async function fetchCountries() {
    return new Promise((resolve) => {
        setTimeout(async () => {
            const result = await fetch("./countries.json");
            resolve(result.json());
        }, 1000);
    });
}
async function createAnimals() {
    try {
        const { countries } = await fetchCountries();
        const animals = [
            new Dog({
                name: "Loki",
                nationality: countries.find((country) => country.includes("L")) ?? "RO",
            }),
            new Horse({
                name: "Thunder",
                age: 14,
                nationality: countries.find((country) => country.includes("T")) ?? "RO",
            }),
            new Fish({
                name: "Nemo",
                age: 2,
                nationality: countries.find((country) => country.includes("N")) ?? "RO",
            }),
        ];
        for (let animal of animals) {
            console.log(animal.characteristics);
            console.log(`${animal.name} moves: ${animal.move()} ${animal instanceof Dog || animal instanceof Horse
                ? `and makes sounds: ${animal.makeSound()}`
                : ""}`);
        }
    }
    catch (err) {
        console.warn(err);
    }
}
createAnimals();
