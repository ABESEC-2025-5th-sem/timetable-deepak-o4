const fs = require('fs');
//fs.appendFileSync('./.abes.txt', ' Appended Data 1');
fs.appendFile('./.abes.txt', ' Appended Data 2', e => {
    if (e) throw e;
    console.log('Data Appended Successfully');
});