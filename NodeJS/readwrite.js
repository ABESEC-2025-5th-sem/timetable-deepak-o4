const fs = require('fs');
const f = ['f1.txt','f2.txt','f3.txt','f4.txt','f5.txt','f6.txt'];
const d = ['1','2','3','4','5','6'];
fs.writeFileSync(f[0], d[0]);
fs.writeFile(f[1], d[1], e => {
	if (e) throw e;
	fs.writeFileSync(f[2], d[2]);
	fs.writeFile(f[3], d[3], e => {
		if (e) throw e;
		fs.writeFileSync(f[4], d[4]);
		fs.writeFile(f[5], d[5], e => {
			if (e) throw e;
			console.log(fs.readFileSync(f[0], 'utf8'));
			fs.readFile(f[1], 'utf8', (e, r) => {
				if (e) throw e;
				console.log(r);
				console.log(fs.readFileSync(f[2], 'utf8'));
				fs.readFile(f[3], 'utf8', (e, r) => {
					if (e) throw e;
					console.log(r);
					console.log(fs.readFileSync(f[4], 'utf8'));
					fs.readFile(f[5], 'utf8', (e, r) => {
						if (e) throw e;
						console.log(r);
					});
				});
			});
		});
	});
});
