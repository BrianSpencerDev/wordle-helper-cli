const fs = require('fs');
const readline = require('readline');

const file = 'words.txt';
let letters = [];

//populate words array 
const words = fs.readFileSync(file, "utf-8").split("\n");


// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout
// })

//prompt user to enter text
// rl.question(`Enter up to 5 letters`, string => {
//   letters = string.split('');
//   rl.close()
// })


console.log(findWordsContaining(['h', 'o'], words));

function findWordsContaining(arr1, arr2){
  const wordsWith = [];

  for (const letter of arr1){
    for(const word of arr2){
      if (word.includes(letter) && !wordsWith.includes(word)){
        wordsWith.push(word);
        console.log('hi')
      }
    }
  }
  
  return wordsWith;
}