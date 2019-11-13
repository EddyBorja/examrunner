
export default function(array) {
    //FROM: https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array 
  let shuffledArray = [...array];
  var currentIndex = shuffledArray.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = shuffledArray[currentIndex];
    shuffledArray[currentIndex] = shuffledArray[randomIndex];
    shuffledArray[randomIndex] = temporaryValue;
  }

  return shuffledArray;
}
