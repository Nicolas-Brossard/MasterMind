let temporarySolution = [0,0,0,0]
let round = 0;

function resolveMasterMind(solution){
  let random = 1;
  console.log('Solution à trouver = ', solution);
  while (!(JSON.stringify(solution)==JSON.stringify(temporarySolution))) {
    if (solution.includes(random)) {
      getPosition(random, solution)
    }
    round ++;
    random ++;
  }
  console.log('Solution trouvé par l\'algorithme = ', temporarySolution);
  console.log(`Solution trouvé au bout de ${round} rounds`);
}

function getPosition(inputNumber, response){
 
  for (let index = 0; index < response.length; index++) {
    round ++;
    if(inputNumber === response[index]){
      temporarySolution[index] = response[index];
    }
  }
  console.log('Solution temporaire', temporarySolution);

}

resolveMasterMind([2,4,5,1])

