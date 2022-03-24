const fs = require('fs');
const readline = require('readline');

const file = 'words.txt';

//populate words array 
const words = fs.readFileSync(file, "utf-8").split("\n");


const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

//prompt user to enter text
rl.question(`Enter up to 5 letters`, string => {
  console.log(string)
  rl.close()
})