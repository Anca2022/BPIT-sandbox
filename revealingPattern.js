function getCountries() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(fetch("countries.json"));
    }, 1000);
  });
}

async function createAnimal({ name, type, age }) {
  const animal = {
    _name: name,
    _age: age ?? name.length * 2,
    _nationality: await setNationality(name),
    _type: type,
  };

  function getName() {
    return animal._name;
  }
  function getAge() {
    return animal._age;
  }
  function getCharacteristics() {
    return `${animal._name} is a ${animal._age} years old ${type}. It's nationality is: ${animal._nationality}.`;
  }
  function getType() {
    return animal._type;
  }

  function move() {
    switch (type) {
      case "dog":
        return `zoom`;
      case "horse":
        return `gallop`;
      case "bird":
        return `fly`;
      default:
        return "unknown animal";
    }
  }
  function makeSound() {
    switch (type) {
      case "dog":
        return `wof-wof`;
      case "horse":
        return `neight`;
      case "bird":
        return "chirp";
      default:
        return "unknown animal";
    }
  }

  async function setNationality(name) {
    // nationality = determinatata de una din literele numelui [US,RO, DE] -> daca pe animal il cheama Dazy va fi in Prima tara care are o litera din nume.
    const countriesJson = await getCountries();
    const { countries } = await countriesJson.json();
    for (let country of countries) {
      country = country.toUpperCase();
      name = name.toUpperCase();
      for (let i = 0; i < name.length; i++) {
        const letter = name.charAt(i);
        if (country.includes(letter)) {
          return country;
        }
      }
    }
    return "RO - default nationality";
  }
  return { getName, getAge, getType, getCharacteristics, move, makeSound };
}

function createMythicalType(t1, t2) {
  if (t1 === t2) return "regular";
  let n = 0;
  //bird: +0, horse: +1, dog: +2
  if ((t1 === "horse") | (t2 === "horse")) {
    n = n + 1;
  }
  if ((t1 === "dog") | (t2 === "dog")) {
    n = n + 2;
  }

  if (n === 1) {
    return "Pegasus"; //bird + horse
  } else if (n === 2) {
    return "Simargl"; //bird + dog
  } else if (n === 3) {
    return "Gytrash"; //horse + dog
  }
}

function makeMythical(a1, a2) {
  const {
    getName: a1GetName,
    getAge: a1GetAge,
    getType: a1GetType,
    makeSound: a1MakeSound,
    move: a1Move,
  } = { ...a1 };
  const {
    getName: a2GetName,
    getAge: a2GetAge,
    getType: a2GetType,
    makeSound: a2MakeSound,
    move: a2Move,
  } = { ...a2 };
  const newType = createMythicalType(a1GetType(), a2GetType());
  if (newType === "regular") {
    console.log("This is a regular animal. No new mythical animal was created");
    return;
  }
  const mythicalAnimal = {
    name: `${a1GetName()}-${a2GetName()}`,
    age: a1GetAge() + a2GetAge(),
    makeSound: () => `${a1MakeSound()} and ${a2MakeSound()}`,
    move: () => `${a1Move()} and ${a2Move()}`,
  };
  console.log(
    `${a1GetName()}+${a2GetName()} => you just created a mystical animal: ${
      mythicalAnimal.name
    } is a ${mythicalAnimal.age} years old ${newType}`
  );
  console.log(
    `It makes: ${mythicalAnimal.makeSound()} and it moves: ${mythicalAnimal.move()}`
  );
}

async function createAndMixAnimals() {
  Promise.allSettled([
    createAnimal({ name: "Loki", type: "dog", age: 7 }),
    createAnimal({ name: "Tweety", type: "bird" }),
    createAnimal({ name: "Thunder", type: "horse" }),
  ])
    .then((data) => {
      data.forEach((item, index) => {
        if (item.status === "fulfilled") {
          console.log(
            `${item.value.getCharacteristics()} It makes: ${item.value.makeSound()} and it moves: ${item.value.move()}.`
          );
          if (index < data.length - 1) {
            makeMythical(item.value, data[index + 1].value);
          }
        }
      });
      const names = data.reduce((list, curr) => {
        list.push(curr.value.getName());
        return list;
      }, []);
      console.log(names);
      // .find si .findIndex
      const nameToFind = "Tweety2";
      const animal = data.find(
        (item) => item.value.getName() === nameToFind
      )?.value;
      const index = data.findIndex(
        (item) => item.value.getName() === nameToFind
      );
      console.log(
        `Animal with name ${nameToFind}: `,
        animal ?? "No animal with this name found",
        index !== -1 ? `found at index no: ${index} in animal list` : ""
      );
    })

    .catch((err) => {
      console.log(err);
    });
}

createAndMixAnimals();
