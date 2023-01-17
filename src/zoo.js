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

const data = require('./data');

function animalsByIds(...ids) {
  const animals = ids.map(( id ) => {
    return data.animals.find(( animal ) => animal.id === id);
  })

  return animals;
}

function animalsOlderThan(animal, age) {
  const animalFound = data.animals.find(({name}) => name === animal);

  return animalFound.residents.every((animal) => animal.age >= age);
}

function employeeByName(employeeName) {
  if (!employeeName) return {};

  return data.employees.find(({firstName, lastName}) => employeeName === firstName || employeeName === lastName);
}

function createEmployee(personalInfo, ...associatedWith) {
  const [managers, responsibleFor] = associatedWith;

  const employee = {
    ...personalInfo,
    ...managers,
    ...responsibleFor,
  }

  return employee;
}

function isManager(id) {
  return !!data.employees.find(({ managers }) => managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const personalInfo = {id, firstName, lastName};
  const associatedWith = { managers, responsibleFor }

  const employee = createEmployee(personalInfo, associatedWith);

  return data.employees.push(employee);
}

function animalCount(specie) {
  if ( specie ) return data.animals.find(({name}) => name === specie).residents.length;

  return data.animals.reduce((acc, { name, residents }) => {
    return {
      ...acc,
      [name]: residents.length
    }
  }, {});
}

function entryCalculator(entrants = {}) {
  return Object.entries(entrants).reduce((acc, [ageGroup, quantity]) =>{
    return acc = acc + data.prices[ageGroup] * quantity;
  }, 0);
}

const locationBase = {
  NE: [],
  NW: [],
  SE: [],
  SW: [],
}

const mapConfig = {
  includeNames: (_, specie, ...residents) => {
    return [{[specie]: residents.map(({ name }) => name)}];
  },
  sex: (sex, specie, ...residents) => {
    return [{[specie]: residents.filter(({ name, sex: animalSex }) => animalSex === sex)
      .map(({ name }) => name)}];
  },
  sorted: (sex, specie, ...residents) => {
    if (sex) {
      return [{[specie]: residents.filter(({ name, sex: animalSex }) => animalSex === sex)
      .map(({ name }) => name).sort()}];
    }

    return [{[specie]: residents.map(({ name }) => name).sort()}];
  },
};

function animalMap(options) {
  const verifiedOptions = options ? Object.keys(options) : [];

  const mapNames = !options || !options.includeNames;

  return data.animals.reduce((acc, { location, name, residents }) => {
    let animals;

    verifiedOptions.forEach((option) => {
      animals = mapConfig[option](options['sex'], name, ...residents);
    });

    return {
      ...acc,
      [location]: mapNames ? [...acc[location], name] : [...acc[location], ...animals],
    }
  },locationBase);
}

function convert24HourToAmPm(open, close) {
  return [open % 12, close % 12];
};

function phraseBuilder(day, {open, close}) {
  if(day === 'Monday') return 'CLOSED';

  const [openHourConverted, closeHourConverted] = convert24HourToAmPm(open, close);

  return `Open from ${openHourConverted}am until ${closeHourConverted}pm`;
};

function schedule(dayName) {
  if (dayName) {
    const [day, hour] = Object.entries(data.hours).find(([day]) => day === dayName);

    return { [day]: phraseBuilder(day, hour) }
  }

  return Object.entries(data.hours).reduce((acc, [day, hours]) => {
    return {
      ...acc,
      [day]: phraseBuilder(day, hours),
    }
  }, {});
}

function oldestFromFirstSpecies(id) {
  const employee = data.employees.find((employee) => employee.id === id);

  const [ specieId ] = employee.responsibleFor;

  const animal = data.animals.find(({ id }) => id === specieId);

  const { name, sex, age} = animal.residents.reduce((acc, resident) => {

    if (resident.age > acc.age) acc = resident;

    return acc;
  });

  return [ name, sex, age ];
}

function increasePercentageCalculate(price, percentage) {
  const calculatedPrice = price + ((price * percentage) / 100);

  const adjustToTwoDecimalCases = Math.round(calculatedPrice * 100) / 100;

  return adjustToTwoDecimalCases;
};

function increasePrices(percentage) {
  const prices = Object.entries(data.prices).reduce((acc, [ageGroup, price]) => {
    return {
      ...acc,
      [ageGroup]: increasePercentageCalculate(price, percentage)
    }
  }, {});

  data.prices = prices;
}

function searchResponsibleAnimals(...responsibleFor) {
  return animalsByIds(...responsibleFor).map(({name}) => name);
};

function concatName (firstName, lastName) {
  return `${firstName} ${lastName}`;
};

function employeeCoverage(idOrName) {
  if (!idOrName) {
    return data.employees.reduce((acc, {firstName, lastName, responsibleFor}) => {
      const name = concatName(firstName, lastName);

      return {
        ...acc,
        [name]: searchResponsibleAnimals(...responsibleFor),
      }
    }, {});
  }

  const employee = data.employees.find(({ id, firstName, lastName }) => id === idOrName ||
   firstName === idOrName ||lastName === idOrName);

  const name = concatName(employee.firstName, employee.lastName);

  return {
    [name]: searchResponsibleAnimals(...employee.responsibleFor)
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
