const fs = require('fs');   
//fs.writeFile('.abes.txt', 'Hii ABES engineering college students.', () => {});
fs.readFile("./.abes.txt", "utf8", (error, result) => {
   if (error) {
    console.log("Error: ", error);
   } else {
    console.log("Result: ", result);
   }
});

