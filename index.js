const fs = require('fs');

const file = 'words.txt';

//populate words array 
const words = fs.readFileSync(file, "utf-8").split("\n");

