const fs = require('fs');   
// fs.writeFileSync('.abes.txt', 'Hii ABES engineering college students.'); 
const result = fs.readFileSync("./.abes.txt", "utf8");
console.log(result); 