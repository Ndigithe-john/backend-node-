const fs = require("fs");
const http = require("http");
const url = require("url");
const replaceTemplate = require("./modules/replaceTemplate");
///////////////////////////////////////
//FILES
// Blocking, synchronous way
// const textIn = fs.readFileSync("./txt/input.txt", "utf-8");
// console.log(textIn);
// const textOut = `This is what i know about avocado: ${textIn}. \n Created on ${Date.now()} `;
// fs.writeFileSync("./txt/output.txt", textOut);
// console.log("file has been written ");

// const textInAdd = fs.readFileSync("./txt/output.txt", "utf-8");
// console.log(textInAdd);
// const textOutAdd = `Avacado being the best fruit i have this to say: \n ${textInAdd} \n Lets see the number of lines output`;
// fs.writeFileSync("./txt/finalOut.txt", textOutAdd);
// console.log("Final Test");
// const todaysFinal = `I want to write some data to this file to text if i got it right ${textOutAdd}`;
// fs.writeFileSync(`./txt/eightFinal.txt`, todaysFinal);
// const readTodaysFinal = fs.readFileSync("./txt/eightFinal.txt", "utf-8");
// console.log(readTodaysFinal);

// Non-blocking, asynchronous way
// fs.readFile("./txt/start.txt", "utf-8", function (err, data) {
//   if (err) return console.log(`Error occoured 💣`);
//   console.log(data);
//   fs.readFile(`./txt/${data}.txt`, "utf-8", (err, data1) => {
//     console.log(data1);
//     fs.readFile("./txt/append.txt", "utf-8", (err, data2) => {
//       console.log("data2" + " " + data2);
//       fs.readFile("./txt/finalOut.txt", "utf-8", (err, data3) => {
//         console.log(data3);
//         fs.writeFile(
//           "./txt/finalFile.txt",
//           `${data} \n ${data1} \n ${data2} \n ${data3}`,
//           "utf-8",
//           (err) => {
//             console.log("Your file has been written 🎉");
//             fs.readFile("./txt/finalFile.txt", "utf-8", (err, data4) => {
//               console.log("Final Data: " + data4);
//             });
//           }
//         );
//       });
//     });
//   });
// });
// console.log("Will read file first");

////////////////////////////////////////////////////////
//SERVER

const productData = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const productDataOject = JSON.parse(productData);
const tempOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  "utf-8"
);
const tempCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  "utf-8"
);
const tempProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  "utf-8"
);
const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);

  //Overview page
  if (pathname === "/" || pathname === "/overview") {
    res.writeHead(200, {
      "Content-type": "text/html",
      "My-Own-Header": "Send this header",
    });
    const cardsHtml = productDataOject
      .map((prod) => replaceTemplate(tempCard, prod))
      .join("");
    const output = tempOverview.replace(/{%PRODUCT_CARDS%}/g, cardsHtml);
    res.end(output);

    // Product page
  } else if (pathname === "/product") {
    res.writeHead(200, {
      "Content-type": "text/html",
    });
    const product = productDataOject[query.id];
    const output = replaceTemplate(tempProduct, product);
    res.end(output);

    //Api
  } else if (pathname === "/api") {
    res.writeHead(200, {
      "Content-type": "application/json",
    });
    res.end(productData);

    //Not Found
  } else {
    res.writeHead(404, {
      "Content-type": "text/html ",
    });
    res.end("<h1>Page not Found!</h1>");
  }
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Listening to requests on port 8000");
});
