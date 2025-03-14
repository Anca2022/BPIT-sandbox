import { Dog, Horse, Fish } from "./animalClasses.js";
const animalTypes = ["dog", "horse", "fish"];
const animalFactory = {
  dog: (name)=> new Dog(name), 
  horse: (name)=> new Horse(name), 
  fish: (name) => new Fish(name) 
}

const newAnimalDiv = document.getElementById("new-animal");

for (let animalType of animalTypes){
  const animalButton = document.getElementById(animalType); 
  animalButton.addEventListener("click", ()=>{
    let name = window.prompt("What's the name of your pet? "); 
    if ( name != undefined ) { 
      if (name.length >= 3){
        addAnimal(name, animalType);
      } else alert ("name is too short! ");
    }
  })
}

function addAnimal(name, type){
  let div = document.createElement("div");
  div.innerText = `New ${type} - ${name}: `

  const animal = animalFactory[type](name); 
  let moveButton = createButton("Move!");
  moveButton.addEventListener("click", ()=>animal.move())
  div.appendChild(moveButton); 

  if (typeof animal.makeSound !== "undefined") {
    let makeSoundButton = createButton("Make Sound! ")
    makeSoundButton.addEventListener("click", ()=>animal.makeSound())
    div.appendChild(makeSoundButton); 
  }

  newAnimalDiv.appendChild(div);
}

function createButton(text){
  let button = document.createElement("button"); 
  button.innerText = text;
  return button;
}
// switch(type){
//   case "Dog":
//     const dog = new Dog(name);
//     makeSoundButton.addEventListener("click", ()=>dog.makeSound())
//     moveButton.addEventListener("click", ()=> dog.move())
//     break; 
//   case "Horse":
//     const horse = new Horse(name);
//     makeSoundButton.addEventListener("click", ()=>horse.makeSound())
//     moveButton.addEventListener("click", ()=> horse.move())
//     break;
//   case "Fish": 
//   const fish = new Fish(name);
//   makeSoundButton.addEventListener("click", () => fish.makeSound())
//     //()=>alert("The fish doesn't make any sound"))
//   moveButton.addEventListener("click", ()=> fish.move())
//   break;
// }