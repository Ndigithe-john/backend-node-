const fs = require("fs");
const textIn = fs.readFileSync("./txt/input.txt", "utf-8");
console.log(textIn);
const textOut = `This is what i know about avocado: ${textIn}. \n Created on ${Date.now()} `;
fs.writeFileSync("./txt/output.txt", textOut);
console.log("file has been written ");

const textInAdd = fs.readFileSync("./txt/output.txt", "utf-8");
console.log(textInAdd);
const textOutAdd = `Avacado being the best fruit i have this to say: \n ${textInAdd} \n Lets see the number of lines output`;
fs.writeFileSync("./txt/finalOut.txt", textOutAdd);
console.log("Final Test");
