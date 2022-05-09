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
  const wordsWith = [];
  const frequency = {};
  const wordsFrequency = [];

  //filter out ?s
  arr1 = arr1.filter(letter => letter !== '?' );

  //find frequency of each char in letters array
  for (const letter of arr1) {
    frequency[letter.toLowerCase()] ? frequency[letter.toLowerCase()] += 1 :     
    frequency[letter.toLowerCase()] = 1;
  }

  //populate wordsFrequency array
  for(const word of arr2) {
    const freq = {};

    //find frequency of chars in string
    for(const char of word) {
      freq[char] ? freq[char] += 1 : freq[char] = 1;
    }
    
    wordsFrequency.push(freq)
  }

  //compare frequencies
  for (let i = 0; i < wordsFrequency.length; i++) {
    let doAdd = true;
    const wordFreq = wordsFrequency[i];
    
    for (const char in frequency) {
      //check if the letter is in the word
      if(!(char in wordFreq)) {
        doAdd = false;
        break;
      }
      //make sure char frequency in word is >= char freq in letters 
      if(frequency[char] > wordFreq[char]) {
        doAdd = false;
        break;
      }
    }
    
    //if word contains desired letters add to wordsWith array
    if(doAdd) {
      wordsWith.push(arr2[i])
    }   
  }  
  

  
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