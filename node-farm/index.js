const fs = require("fs");

// Blocking, synchronous way
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
const todaysFinal = `I want to write some data to this file to text if i got it right ${textOutAdd}`;
fs.writeFileSync(`./txt/eightFinal.txt`, todaysFinal);
const readTodaysFinal = fs.readFileSync("./txt/eightFinal.txt", "utf-8");
console.log(readTodaysFinal);

// Non-blocking, asynchronous way
fs.readFile("./txt/start.txt", "utf-8", (err, data) => {
  console.log(data);
  fs.readFile(`./txt/${data}.txt`, "utf-8", (err, data1) => {
    console.log(data1);
    fs.readFile("./txt/append.txt", "utf-8", (err, data2) => {
      console.log("data2" + " " + data2);
      fs.readFile("./txt/finalOut.txt", "utf-8", (err, data3) => {
        console.log(data3);
        fs.writeFile(
          "./txt/finalFile.txt",
          `${data} \n ${data1} \n ${data2} \n ${data3}`,
          "utf-8",
          (err) => {
            console.log("Your file has been written 🎉");
            fs.readFile("./txt/finalFile.txt", "utf-8", (err, data4) => {
              console.log("Final Data: " + data4);
            });
          }
        );
      });
    });
  });
});
console.log("Will read file first");
