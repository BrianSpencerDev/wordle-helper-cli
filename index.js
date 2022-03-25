const fs = require('fs');
const prompt = require('prompt-sync')({sigint: true});

const file = 'words.txt';

//populate words array 
const words = fs.readFileSync(file, "utf-8").split("\n");

//get user input
const input = prompt('Enter up to 5 letters:  ');

//convert input string to array of letters
const letters = input.split('');

console.log(findWordsContaining(letters, words));



function findWordsContaining(arr1, arr2){
  let pattern = '';
  const wordsWith = [];

  //create regex
  for (const letter of arr1){
    pattern += '(?=\\w*' + letter + ')';
  }
  pattern += '\\w+';
  const regex = new RegExp(pattern);

  //iterate through words to see if letters are in a word
  for (const word of words){
    //if letters are in word add word to wordsWith arr
    if(regex.test(word)){
      wordsWith.push(word)
    }
  };
  
  return wordsWith;
}