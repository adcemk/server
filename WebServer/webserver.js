const express = require('express');
const path = require('path');

const app = express();
//const PORT = process.env.PORT || 3000
const PORT = 3000;

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/views/index.html'));
});

app.get('/instructions', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/views/instructions.html'));
});

app.get('/table', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/views/table.html'))
})

app.use(express.urlencoded());
app.use(express.json());

app.post('/request', (req, res) => {
    console.log(req.body.ciclo);
    console.log(req.body.materia);
    return res.redirect('/');
});

app.listen(PORT, () => {
  console.log(`WebServer app listening on port ${PORT}!`)
});