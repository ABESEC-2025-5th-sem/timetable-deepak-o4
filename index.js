const http = require('http');
const fs = require('fs');

const myserver = http.createServer((req, res) => {
    console.log('server1');

    if (req.url === '/images.jpeg') {
        const img = fs.readFileSync('images.jpeg');
        res.writeHead(200, { 'Content-Type': 'image/jpeg' });
        res.end(img);
        return;
    }

    res.writeHead(200, { 'Content-Type': 'text/html' });

    if (req.url == '/') {
        res.end(`
            <h1>Welcome ABES Engineering College</h1>
            <img src="/images.jpeg" width="300">
        `);
    } 
    else if (req.url == '/about') {
        res.end(`
            <p>I am student of ABES Engineering College CSE_DS Section-B</p>
            <img src="/images.jpeg" width="300">
        `);
    } 
    else if (req.url == '/contact') {
        res.end(`
            <p>Address: Crossing Republic Ghaziabad UP India</p>
            <p>Phone: +91 9793360058</p>
            <img src="/images.jpeg" width="300">
        `);
    } 
    else {
        res.end('404 Page Not Found');
    }
});

myserver.listen(8000, () => console.log('Server 1 is running on port 8000'));