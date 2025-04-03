class Animal {
  constructor(name) {
    this.name = name;
  }
  move() {
    alert("The animal moves");
  }
}

class VocalAnimal extends Animal {
  makeSound() {
    alert("The animal makes a generic sound");
  }
}

class Dog extends VocalAnimal {
  makeSound() {
    alert(`${this.name} makes wof-wof`);
  }
  move() {
    alert(`${this.name} is zooming`);
  }
}

class Horse extends VocalAnimal {
  makeSound() {
    alert(`${this.name} makes neight`);
  }
  move() {
    alert(`${this.name} is galloping`);
  }
}

class Fish extends Animal {
  move() {
    alert(`${this.name} is swimming`);
  }
}

export class Factory {
  createAnimal(type, name){
    switch (type){
      case "dog": 
        return new Dog(name); 
      case "horse": 
        return new Horse(name); 
      case "fish":
        return new Fish(name)
    }
  }
};