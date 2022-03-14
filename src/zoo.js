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
  const animals = ids.map(id => {

    return data.animals.find(idAnimal => idAnimal.id === id);
  })

  return animals;
}

function animalsOlderThan(animal, age) {
  const animals = data.animals.find(({ name }) => name === animal);

  return animals.residents.every(resident => resident.age >= age);
}

function employeeByName(employeeName) {
  if (!employeeName) return {};
  const employee = data.employees.find(employee => employee.firstName == employeeName || employee.lastName == employeeName);

  return employee;
}

function createEmployee(personalInfo, associatedWith) {
  const employee = {
    ...personalInfo,
    ...associatedWith
  }

  return employee;
}

function isManager(id) {
  return data.employees.some(({ managers }) => managers.some(idManager => idManager === id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const personalInfo = { id, firstName, lastName };
  const associatedWith = { managers, responsibleFor, }

  const employee = createEmployee(personalInfo, associatedWith);

  return data.employees.push(employee);
}

function animalCount(specie) {
  if (!specie) return Object.fromEntries(data.animals.map(({ name, residents }) => [name, residents.length]));

  const {residents} = data.animals.find(({ name }) => name === specie);

  return residents.length;
}

function entryCalculator(entrants) {
  if (!entrants) return 0;

  if (entrants === undefined) return 0;

  const totalPrice = Object.entries(entrants).reduce((acc, [category, quantity]) => {
    return acc += quantity * data.prices[category];
  }, 0);

  return totalPrice;
}

function getAnimalsNameByLocation(animal, sort, sex) {
  let nameAnimalsResponse = {};
  let nameAnimals = [];
  let nameAnimalsSex = [];

  animal.residents.forEach(resident => {
    if (resident.sex === sex) {

      nameAnimalsSex.push(resident.name);
    } else {
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

  return { [dayName]: situation }
}

function oldestFromFirstSpecies(id) {

  const employee = data.employees.find(employee => employee.id === id);
  const firstAnimal = 0;

  let idAnimal = '';

  idAnimal = employee.responsibleFor[firstAnimal];

  const animals = data.animals.find(animal => animal.id === idAnimal);

  const { name, sex, age } = animals.residents.reduce((older, animal) => {

    return animal.age > older.age ? animal : older;
  });

  return [name, sex, age];
}

function increasePrices(percentage) {

  const prices = Object.entries(data.prices).reduce((acc, [category, price]) => ({
    ...acc,
    [category]: Math.round((price + (price * percentage / 100)) * 100) / 100
  }), {});

  return data.prices = prices;
}

function employeeCoverage(idOrName) {

  if (!idOrName) {
    const employees = data.employees.map(employee => {

      return [`${employee.firstName} ${employee.lastName}`, employee.responsibleFor];
    });

    const employeesWithYoursAnimals = employees.map(([employeeName, idsOfResponsible]) => {
      let species = [];

      for (let id of idsOfResponsible) {
        const { name: nameOfSpecie } = data.animals.find(animal => animal.id === id);

        species.push(nameOfSpecie);
      }

      return [employeeName, species];
    });

    return Object.fromEntries(employeesWithYoursAnimals);
  }

  let employee = data.employees.find(employee => employee.id === idOrName
      || employee.firstName === idOrName
      || employee.lastName === idOrName);

  const animalsIds = [...employee.responsibleFor];

  const animalNames = animalsIds.map(id => {
    const { name } = data.animals.find(animal => animal.id === id);

    return name;
  });

  const { firstName, lastName } = employee;

  return {
    [`${firstName} ${lastName}`]: animalNames
  }
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
