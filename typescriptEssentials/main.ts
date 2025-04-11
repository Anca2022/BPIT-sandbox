interface FactoryAnimalParams {
  type: "dog" | "horse" | "bird";
  name: string;
  age?: number;
}
interface AnimalParams extends Omit<FactoryAnimalParams, "type" | "age"> {
  calculatedAge: number;
  nationality: string;
}
type CountryData = {
  countries: string[];
};
type AnimalType = InstanceType<typeof Dog | typeof Horse | typeof MuteBird>;
type AnimalData = {
  status: string;
  value: AnimalType;
};
interface Talkable {
  makeSound: () => string;
}
abstract class Animal {
  private _name: string;
  private _age: number;
  private _nationality: string;
  constructor({ name, calculatedAge, nationality }: AnimalParams) {
    this._name = name;
    this._age = calculatedAge;
    this._nationality = nationality;
  }

  abstract move(): string;
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

class Dog extends Animal implements Talkable {
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

class Horse extends Animal implements Talkable {
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

class MuteBird extends Animal {
  //doesn't makeSound
  move() {
    return `flying`;
  }
  get characteristics() {
    return `${super.characteristics}; it's a bird`;
  }
}

class AnimalFactory {
  static async createAnimal({ type, name, age }: FactoryAnimalParams) {
    const calculatedAge = age ?? name.length * 2;
    const nationality = await AnimalFactory.createNationality(name);

    switch (type) {
      case "dog":
        return new Dog({ name, calculatedAge, nationality });
      case "horse":
        return new Horse({ name, calculatedAge, nationality });
      case "bird":
        return new MuteBird({ name, calculatedAge, nationality });
      default:
        const exhaustiveCheck: never = type;
        throw new Error(`Error: ${exhaustiveCheck}`);
    }
  }

  private static async createNationality(name: string) {
    const firstLetter = name.charAt(0).toUpperCase();
    const { countries } = await AnimalFactory.fetchCountries();

    const country = countries.find((country) => country.includes(firstLetter));
    return country ?? "RO-default";
  }
  private static async fetchCountries(): Promise<CountryData> {
    return new Promise((resolve) => {
      setTimeout(async () => {
        const result = await fetch("../javascriptEssentials/countries.json");
        resolve(result.json());
      }, 1000);
    });
  }
}

(async function () {
  try {
    const listOfPromises = (await Promise.allSettled([
      AnimalFactory.createAnimal({ type: "bird", name: "Tweety" }),
      AnimalFactory.createAnimal({ type: "dog", name: "Loki", age: 7 }),
      AnimalFactory.createAnimal({ type: "horse", name: "Thunder", age: 2 }),
    ])) as AnimalData[];
    const animals = listOfPromises.map((item) => item.value);
    for (let animal of animals) {
      console.log(animal.characteristics);
      console.log(
        `${animal.name} moves: ${animal.move()} ${
          animal instanceof Dog || animal instanceof Horse
            ? `and makes sounds: ${animal.makeSound()}`
            : ""
        }`
      );
    }
  } catch (err) {
    console.warn(err);
  }
})();
