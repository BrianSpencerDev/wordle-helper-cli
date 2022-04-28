const fs = require('fs');
const prompt = require('prompt-sync')({sigint: true});

const file = 'words.txt';
let wordsWith = [];

//populate words array 
const words = fs.readFileSync(file, "utf-8").split("\n");

//get user input
const input = prompt('Enter up to 5 letters:  ');

//convert input string to array of letters
const letters = input.split('');


//first take the list of words and search for the letters where position matters
wordsWith = findWordsWithCharPos(letters, words);

//second take the new list of words and search for the letters where position does not matter
wordsWith = findWordsContaining(letters, wordsWith);

//sort array alphabetically
wordsWith.sort();

//return array of words
console.log(wordsWith);



function findWordsContaining(arr1, arr2){
  let pattern = '';
  const wordsWith = [];

  arr1 = filterOutPos(arr1);

  //create regex
  for (const letter of arr1){
    pattern += '(?=\\w*' + letter + ')';
  }
  pattern += '\\w+';
  const regex = new RegExp(pattern);

  //iterate through words to see if letters are in a word
  for (const word of arr2){
    //if letters are in word add word to wordsWith arr
    if(regex.test(word)){
      wordsWith.push(word)
    }
  };
  
  return wordsWith;
}

function findWordsWithCharPos(arr1, arr2){
  const wordsWith = [];
  const letterPos = {};

  //populate arr with 0
  const numOfLettersIn = new Array(arr2.length).fill(0);

  
  //check to see if letter is uppercase
  for (let i = 0; i < arr1.length; i++){
    if(arr1[i] === arr1[i].toUpperCase() && arr1[i] !== '?'){
      letterPos[arr1[i].toLowerCase()] = i;
    }
  }

  //take out positonal letters out of arr1
  arr1 = arr1.filter(letter => letter !== letter.toUpperCase() );

  //take out question marks out of letters
  arr1 = arr1.filter(letter => letter !== '?' );
  
  //number of total positions letter to be searched
  const positions = Object.keys(letterPos).length;

  //fill numOfLettersIn with number of desired letters in word
  for (const letter in letterPos){
    const position = letterPos[letter];

    for (let i = 0; i < arr2.length; i++){
      if(arr2[i].charAt(position) === letter){
        numOfLettersIn[i]++;
      }
    }
  }

  //if numOfLettersIn equals the num of positions add to wordsWith arr
  for(let i = 0; i < numOfLettersIn.length; i++){
    if (positions === numOfLettersIn[i]){
      wordsWith.push(arr2[i]);
    }
  }

  return wordsWith;
}

function filterOutPos(arr){
  //take out positonal letters out of arr1
  arr = arr.filter(letter => letter !== letter.toUpperCase() );

  //take out question marks out of letters
  arr = arr.filter(letter => letter !== '?' );

  return arr
}
