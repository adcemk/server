const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

const ipc = require('node-ipc');

ipc.config.id = 'a-unique-process-name1';
ipc.config.retry = 1500;
ipc.config.silent = true;
ipc.serve(() => ipc.server.on('a-unique-message-name', message => {
  console.log(message);
}));
ipc.server.start();

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/views/index.html'));
});

app.use(express.urlencoded());
app.use(express.json());

app.post('/request', (req, res) => {
    console.log(req.body.ciclo);
    console.log(req.body.materia);
    return res.redirect('/');
});

app.listen(port, () => {
  console.log(`WebServer app listening on port ${port}!`)
});