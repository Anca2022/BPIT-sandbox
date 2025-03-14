class Animal {
  constructor(name){
    this.name = name; 
  }
  move(){
    alert("The animal moves"); 
  }
}

class VocalAnimal extends Animal {
  makeSound(){
    alert("The animal makes a generic sound"); 
  }
}

export class Dog extends VocalAnimal{
  makeSound(){
    alert(`${this.name} makes wof-wof`);
  }
  move(){
    alert(`${this.name} is zooming`);
  }
}

export class Horse extends VocalAnimal{
  makeSound(){
    alert(`${this.name} makes neight`);
  }
  move(){
    alert(`${this.name} is galloping`);
  }
}

export class Fish extends Animal{
  move(){
    alert(`${this.name} is swimming`);
  }
}