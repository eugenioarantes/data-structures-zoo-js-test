# Boas vindas ao repositório do projeto de ES6 e Higher Order Functions!

## O que deverá ser desenvolvido

Você implementará várias funções para atender aos requisitos propostos e garantir que todas as funções passem nos testes unitários.


## Requisitos do projeto

Vocẽ deverá implementar as funções que estão no `src/zoo.js` para passarem em cada um dos testes. O teste `test/animalsByIds.test.js`, por exemplo, testa a função `addEmployee`, que já está criada dentro do `src/zoo.js`, embora ainda não contenha lógica alguma. Para ver o que cada função precisa retornar basta ver o `assert` de cada um dos testes.

Utilize as novas funcionalidades do ES6 como arrow functions, template literals, spread operator, parâmetro rest, object destructuring, entre as outras. Utilize também as _High Order Functions_.

**Dica**: uma importante soft-skill é saber como gerenciar seu tempo. Alguns exercícios são mais difíceis que outros, e não estão em ordem de complexidade. Caso tenha dificuldade para realizar algum exercício, pule-o, resolva outro, e quando se sentir confortável, volte ao exercício em questão. A ideia é não ficar preso a um problema por um longo período. Realizar outros exercícios pode te ajudar a enxergar e/ou aprender novas maneiras de se chegar ao resultado esperado.

Antes de começar analise o arquivo `src/data.js`, para ver os dados que serão usados.

### 1- Implemente a função animalsByIds:
  - Caso receba nenhum parâmetro, necessário retornar um array vazio
  - Ao receber como parâmetro um único id, retorna os animais com este id
  - Ao receber mais de um id, retorna os animais que têm um desses ids

### 2- Implemente a função animalsOlderThan:
  - Ao passar o nome de uma espécie e uma idade, testa se todos os animais desta
 espécie possuem a idade mínima especificada

### 3- Implemente a função employeeByName:
  - Sem parâmetros, retorna um objeto vazio
  - Quando provido o primeiro nome do funcionário, retorna o objeto do funcionário
  - Quando provido o último nome do funcionário, retorna o objeto do funcionário

### 4- Implemente a função createEmployee:
  - Cria um novo colaborador a partir de objetos contendo `informações pessoais` e `gerentes e animais gerenciados`.

### 5- Implemente a função isManager:
  - Testa se o id passado é de um gerente

### 6- Implemente a função addEmployee:
  - Adiciona um funcionário no fim da lista

### 7- Implemente a função animalCount:
  - Sem parâmetros, retorna animais e suas quantidades
  - Com o nome de uma espécie de animal, retorna somente a quantidade

### 8- Implemente a função entryCalculator:
  - Retorna 0 se nenhum argumento for passado
  - Retorna 0 se um objeto vazio for passado
  - Retorna o preço total a ser cobrado dado o número de adultos, crianças e idosos

### 9- Implemente a função animalMap:
  - Sem parâmetros, retorna animais categorizados por localização
  - Com a opção `includeNames: true` especificada, retorna nomes de animais
  - Com a opção `sorted: true` especificada, retorna nomes de animais ordenados
  - Com a opção `sex: 'female'` ou `sex: 'male'` especificada, retorna somente nomes de animais macho/fêmea
  - Com a opção `sex: 'female'` ou `sex: 'male'` especificada e a opção `sort: true` especificada, retorna somente nomes de animais macho/fêmea com os nomes dos animais ordenados
  - Só retorna informações ordenadas e com sexo se a opção `includeNames: true` for especificada

### 10- Implemente a função schedule:
  - Sem parâmetros, retorna um cronograma legível para humanos
  - Se um único dia for passado, retorna somente este dia em um formato legível para humanos

### 11- Implemente a função oldestFromFirstSpecies:
  - Passado o id de um funcionário, encontra a primeira espécie de animal
  gerenciado pelo funcionário, e retorna um array com nome, sexo e idade do
  animal mais velho dessa espécie

### 12- Implemente a função increasePrices:
  - Ao passar uma porcentagem, incrementa todos os preços, arrendondados em duas casas decimais

### 13- Implemente a função employeeCoverage:
  - Sem parâmetros, retorna uma lista de funcionários e os animais pelos quais eles são responsáveis
  - Com o id de um funcionário, retorna os animais pelos quais o funcionário é responsável
  - Com o primeiro nome de um funcionário, retorna os animais pelos quais o funcionário é responsável
  - Com o último nome de um funcionário, retorna os animais pelos quais o funcionário é responsável

---
