const express = require('express');
const fs = require('fs');
const app = express()
const port = 3000
let visitsInSesion = 0;
let allVisits;
try {
    allVisits = fs.readFileSync('counter.txt');
} catch (error) {
    allVisits = 0;
} 

app.get('/', (req, res) => {
    visitsInSesion++;
    allVisits++;
    fs.writeFileSync('counter.txt', allVisits.toString());
    res.send(`Number of visits per session = ${visitsInSesion} Total number of visits = ${allVisits}`);
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})