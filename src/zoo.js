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
const { hours } = require('./data');
const data = require('./data');

const MIDDAY_HOUR = 12;
const CLOSED_HOUR = 0;

function animalsByIds(...ids) {
  const animals = ids.map(id => {

    return data.animals.find(idAnimal => idAnimal.id === id);
  })

  return animals;
}

function animalsOlderThan(animal, age) {
  const specie = data.animals.find(({ name }) => name === animal);

  return specie.residents.every(resident => resident.age >= age);
}

function employeeByName(employeeName) {
  if (!employeeName) return {};

  const employee = data.employees.find(
    ({ firstName, lastName }) => firstName === employeeName || lastName === employeeName
  );

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
  return data.employees.some(({ managers }) => managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const personalInfo = { id, firstName, lastName };
  const associatedWith = { managers, responsibleFor, }

  const employee = createEmployee(personalInfo, associatedWith);

  return data.employees.push(employee);
}

function animalCount(specie) {
  if (!specie) return Object.fromEntries(data.animals.map(({ name, residents }) => [name, residents.length]));

  const animal = data.animals.find(({ name }) => name === specie);

  return animal?.residents.length || 0;
}

function entryCalculator(entrants = {}) {
  const totalPrice = Object.entries(entrants).reduce(
    (acc, [category, quantity]) =>  acc += quantity * data.prices[category],
    0,
  );

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

function convert24HourToAmPm(hour) {
  if (hour > MIDDAY_HOUR) return `${hour % MIDDAY_HOUR}pm`

  return `${hour}am`;
}

function messageSchedule({close, open}) {
 if (open === CLOSED_HOUR && close === CLOSED_HOUR) return 'CLOSED';

 const [openConverted, closeConverted] = [open, close].map(hour => convert24HourToAmPm(hour));

 return `Open from ${openConverted} until ${closeConverted}`;

}

function schedule(dayName) {

  if (dayName) return {[dayName]: messageSchedule(data.hours[dayName])};

  const scheduleOfWeek = Object.entries(data.hours).reduce((acc, [day, hours] ) => ({
    ...acc,
    [day]: messageSchedule(hours)
  }),{});

  return scheduleOfWeek;
}

function oldestFromFirstSpecies(id) {
  const employee = data.employees.find(employee => employee.id === id);

  const [animalId] = employee.responsibleFor

  const animal = data.animals.find(animal => animal.id === animalId);

  const { name, sex, age } = animal.residents.reduce(
    (older, animal) => animal.age > older.age ? animal : older
  );

  return [name, sex, age];
}

function adjustToTwoDecimalCases(number) {
  return Math.round(number * 100) / 100
}

function convertPercentageToDecimal(value) {
  return value / 100;
}

function modifyValueByPercentage(value, percentage) {
  const amountToModify = value * convertPercentageToDecimal(percentage)

  return value + amountToModify;
}

function adjustPriceByPercentage(price, percentage) {
  const adjustedPrice = modifyValueByPercentage(price, percentage)

  return adjustToTwoDecimalCases(adjustedPrice)
}

function increasePrices(percentage) {
  const prices = Object.entries(data.prices).reduce((acc, [category, price]) => ({
    ...acc,
    [category]: adjustPriceByPercentage(price, percentage),
  }), {});

  data.prices = prices;
}

function getAnimalById(id) {
  const [animal] = animalsByIds(id)

  return animal
}

function getAnimalNameById(id) {
  const animal = getAnimalById(id)

  return animal.name
}

function getEmployeesAnimalsMapping(employees) {
  const keyValueEmployeeList = employees.map(({ lastName, firstName, responsibleFor }) => {
    const animalNames = responsibleFor.map(getAnimalNameById)

    return [`${firstName} ${lastName}`, animalNames]
  });

  return Object.fromEntries(keyValueEmployeeList);
}

function getEmployeeByNameOrId(idOrName) {
  const employee = data.employees.find(employee => (
    employee.id === idOrName
      || employee.firstName === idOrName
      || employee.lastName === idOrName
  ));

  return employee
}

function employeeCoverage(idOrName) {
  const employee = idOrName && getEmployeeByNameOrId(idOrName)

  const employees = idOrName ? [employee] : data.employees

  const mapping = getEmployeesAnimalsMapping(employees)

  return mapping;
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
