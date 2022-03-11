/*
eslint no-unused-vars: [
  "error",
  {
    "args": "none",
    "vars": "local",
    "varsIgnorePattern": "data"
  }
]
*/

const { prices } = require('./data');
const data = require('./data');

function animalsByIds(...ids) {

  if (!ids) return []

  if (ids.length) {
    let animals = [];

    ids.forEach((idAnimal) => {
      animals.push(data.animals.find(animal => animal.id == idAnimal));
    });

    return animals;
  }

  return data.animals.filter(animal => animal.id == ids);

}

function animalsOlderThan(animal, age) {

 const animals = data.animals.find(animalFilter => animalFilter.name === animal);

 let ages = [];

 animals.residents.forEach((resident) => {
  ages.push(resident.age);
 });

 return ages.every(ageTest => ageTest > age);

}

function employeeByName(employeeName) {

  if (!employeeName) return {};

  const employee = data.employees.find(employee => employee.firstName == employeeName || employee.lastName == employeeName);

  return employee;
}

function createEmployee(personalInfo, associatedWith) {

  const employee = {
    id: personalInfo.id,
    firstName: personalInfo.firstName,
    lastName: personalInfo.lastName,
    managers: associatedWith.managers,
    responsibleFor: associatedWith.responsibleFor
  }

  return employee;
}

function isManager(id) {

  let isManagerFlag = false;

  data.employees.forEach((employee) => {
    let idOfManager = false;

    idOfManager = employee.managers.some(idManager => idManager === id);

    if (idOfManager) return isManagerFlag = true;
  });

  if (isManagerFlag) return true;

  return false;
}

function addEmployee(id, firstName, lastName, managers, responsibleFor) {

  if (managers === undefined) managers = [];

  if (responsibleFor === undefined) responsibleFor = [];

  const personalInfo = {
    id,
    firstName,
    lastName,
  }

  const associatedWith = {
    managers,
    responsibleFor,
  }

  const employee = createEmployee(personalInfo, associatedWith);

  return data.employees.push(employee);
  }

function animalCount(species) {
  if (!species) {
    let allSpeciesCount = {}

    data.animals.forEach((animal) => {
      allSpeciesCount[animal.name] = animal.residents.length;
    });

    return allSpeciesCount;
  }

  const animal = data.animals.find(animal => animal.name === species);
  const quantityOfAnimalsOfSpecie = animal.residents.length;

  return quantityOfAnimalsOfSpecie;
}

function entryCalculator(entrants) {

  if (!entrants) return 0;

  if (entrants === undefined) return 0;

  const ageGroupIndex = 0;
  const quantityOfPeoplesIndex = 1;
  let price;
  let prices = [];

  const entrantValues = Object.entries(entrants);

  entrantValues.forEach(element => {

  if (element[ageGroupIndex] === 'Adult') {
    price = data.prices.Adult;
    prices.push(element[quantityOfPeoplesIndex] * price);

  } else if (element[ageGroupIndex] === 'Child') {
    price = data.prices.Child;
    prices.push(element[quantityOfPeoplesIndex] * price);

  } else if (element[ageGroupIndex] === 'Senior') {
    price = data.prices.Senior;
    prices.push(element[quantityOfPeoplesIndex] * price);

  }
  });

  const payableAmount = prices.reduce((accumulator, prices) => accumulator + prices, 0);

  return payableAmount;

}

function getAnimalsNameByLocation (animal, sort, sex) {

  let nameAnimalsResponse = {};
  let nameAnimals = [];
  let nameAnimalsSex = [];

  animal.residents.forEach(resident => {
    if(resident.sex === sex) {
      nameAnimalsSex.push(resident.name);
    }else {
     nameAnimals.push(resident.name);
    }

  });

  if ((sort) && (sex)) {
    const nameAnimalsSexSorted = nameAnimalsSex.sort();
    nameAnimalsResponse[animal.name] = nameAnimalsSexSorted;
  } else if (sort) {
    const nameAnimalsSorted = nameAnimals.sort();
    nameAnimalsResponse[animal.name] = nameAnimalsSorted;
  } else if (sex) {
    nameAnimalsResponse[animal.name] = nameAnimalsSex;
  } else {
    nameAnimalsResponse[animal.name] = nameAnimals;
  }

  return nameAnimalsResponse;
}

function animalsByLocation(sort, sex) {

  let namesAnimalsResponse = {};

  let animalsNE = [];
  let animalsNW = [];
  let animalsSE = [];
  let animalsSW = [];

    data.animals.forEach(animal => {
      if (animal.location === 'NE') {
        namesAnimalsResponse = getAnimalsNameByLocation(animal, sort, sex);
        animalsNE.push(namesAnimalsResponse);

      } else if (animal.location === 'NW') {
        namesAnimalsResponse = getAnimalsNameByLocation(animal, sort, sex);
        animalsNW.push(namesAnimalsResponse);

      } else if (animal.location === 'SE') {
        namesAnimalsResponse = getAnimalsNameByLocation(animal, sort, sex);
        animalsSE.push(namesAnimalsResponse);

      } else if (animal.location === 'SW') {
        namesAnimalsResponse = getAnimalsNameByLocation(animal, sort, sex);
        animalsSW.push(namesAnimalsResponse);

      }
    });

    let locationResponseWithNames = {
      NE: animalsNE,
      NW: animalsNW,
      SE: animalsSE,
      SW: animalsSW
    }
    return locationResponseWithNames;
}

function animalMap(options) {
  if (!options || !options.includeNames) {
    let animalsWithLocationNE = [];
    let animalsWithLocationNW = [];
    let animalsWithLocationSE = [];
    let animalsWithLocationSW = [];

    data.animals.forEach(animal => {
      if (animal.location === 'NE') {
        animalsWithLocationNE.push(animal.name);
      } else if (animal.location === 'NW') {
        animalsWithLocationNW.push(animal.name);
      } else if (animal.location === 'SE') {
        animalsWithLocationSE.push(animal.name);
      } else if (animal.location === 'SW') {
        animalsWithLocationSW.push(animal.name);
      }
    });

    let locationResponse = {
      NE: animalsWithLocationNE,
      NW: animalsWithLocationNW,
      SE: animalsWithLocationSE,
      SW: animalsWithLocationSW
    }
    return locationResponse;
  }

  if (options.includeNames && options.sex && options.sorted) {

    return animalsByLocation(options.sorted, options.sex);
  }

  if (options.includeNames && options.sorted) {

    return animalsByLocation(options.sorted);
  }

  if (options.includeNames && options.sex) {
    const noSort = false;

    return animalsByLocation(noSort, options.sex);
  }

  if (options.includeNames) {

    return animalsByLocation();
  }

}

const scheduleOfWeek = {
  Tuesday: 'Open from 8am until 6pm',
  Wednesday: 'Open from 8am until 6pm',
  Thursday: 'Open from 10am until 8pm',
  Friday: 'Open from 10am until 8pm',
  Saturday: 'Open from 8am until 10pm',
  Sunday: 'Open from 8am until 8pm',
  Monday: 'CLOSED'
}

function schedule(dayName) {

  if (!dayName) return scheduleOfWeek;

  const situation = scheduleOfWeek[dayName];

  let scheduleResponse = {}
  scheduleResponse[dayName] = situation;

  return scheduleResponse;
}

function oldestFromFirstSpecies(id) {
  const employee = data.employees.find(employee => employee.id === id);

  const firstAnimal = 0;
  let idAnimal = '';

  idAnimal = employee.responsibleFor[firstAnimal];

  const animals = data.animals.find(animal => animal.id === idAnimal);

  let ageAccumulator = 0;
  let oldestAnimal = [];

  animals.residents.forEach((resident) => {
    if (resident.age > ageAccumulator){
      ageAccumulator = resident.age;

      oldestAnimal = [];
      oldestAnimal.push(resident.name, resident.sex, resident.age);
    }
  });

  return oldestAnimal;
}

function increasePrices(percentage) {

  let priceAdult = Math.round((data.prices.Adult+(data.prices.Adult*percentage/100)) * 100) / 100;
  let priceChild = Math.round((data.prices.Child+(data.prices.Child*percentage/100)) * 100) / 100;
  let priceSenior = Math.round((data.prices.Senior+(data.prices.Senior*percentage/100)) * 100) / 100;


  data.prices.Adult = Math.round((priceAdult) * 100) / 100

  data.prices.Child = Math.round((priceChild) * 100) / 100

  data.prices.Senior = Math.round((priceSenior) * 100) / 100


}

function employeeCoverage(idOrName) {

  if (!idOrName) {
    let animalsList = [];
    let allAnimalsResponse = {}

    data.employees.forEach((employee) => {
      employee.responsibleFor.forEach((idAnimal) => {
        let animalFound = data.animals.find(animal => animal.id === idAnimal);
        animalsList.push(animalFound.name);
      });

      allAnimalsResponse[`${employee.firstName} ${employee.lastName}`] = animalsList;
      animalsList = [];
    });

    return allAnimalsResponse;
    }

    let employee = data.employees.find(employee => employee.id === idOrName
      || employee.firstName === idOrName || employee.lastName === idOrName);

    let animals = [];

    employee.responsibleFor.forEach((idAnimal) => {
      let animal = data.animals.find(animal => animal.id === idAnimal);
      animals.push(animal.name);
    });

    let animalsResponse = {}
    animalsResponse[`${employee.firstName} ${employee.lastName}`] = animals;

    return animalsResponse;
}

module.exports = {
  entryCalculator,
  schedule,
  animalCount,
  animalMap,
  animalsByIds,
  employeeByName,
  employeeCoverage,
  addEmployee,
  isManager,
  animalsOlderThan,
  oldestFromFirstSpecies,
  increasePrices,
  createEmployee,
};
