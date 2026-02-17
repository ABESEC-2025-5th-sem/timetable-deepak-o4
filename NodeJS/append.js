const fs = require('fs');
//fs.appendFileSync('./.abes.txt', ' Appended Data 1');
//fs.appendFile('./.abes.txt', ' Appended Data 2', e => {
  //  if (e) throw e;
    //console.log('Data Appended Successfully');
//});
//fs.copyFileSync('./.abes.txt', './a1.txt');
//fs.copyFile('./.abes.txt', './a2.txt', e => {
    //if (e) throw e;
    //console.log('File Copied Successfully');
//});
//fs.unlinkSync("./f1.txt");
fs.unlink("./f2.txt", e => {
    if (e) {
        if (e.code === 'ENOENT') {
            console.log('File not found, nothing to delete');
            return;
        }
        throw e;
    }
    console.log('File Deleted Successfully');
});