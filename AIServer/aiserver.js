const express = require('express')
const fs = require('fs')
const {spawn} = require('child_process')
const path = require('path')

var expressWs = require('express-ws');
var expressWs = expressWs(express());
var app = expressWs.app;
const port = 3001;

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({
    limit: '50mb',
    extended: true
}));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS. PUT. DELETE');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-Width, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

const ipc = require('node-ipc');

ipc.config.id = 'a-unique-process-name2';
ipc.config.retry = 1500;
ipc.config.silent = true;
ipc.connectTo('a-unique-process-name1', () => {
  ipc.of['jest-observer'].on('connect', () => {
    ipc.of['jest-observer'].emit('a-unique-message-name', "The message we send");
  });
});

app.get('/ai', (req, res) => {
    
    console.log(req.params);
    console.log(req.body);

    var ciclo = req.body.ciclo;
    var materias = req.body.materias;
    var dataToSend;
  
    const python = spawn('python', ['ai_script.py', ciclo, materias]);
  
    python.stdout.on('data', (data) => {
        console.log("data variable inside python subprocess:")
        console.log(data)
        //res.send(data.toString())
        dataToSend = data.toString();
    });
  
    python.on('close', (code) => {
        console.log(`child process close all stdo with code ${code}`);
        //res.send(JSON.stringify(json))
        res.send(dataToSend);
    });
});

app.listen(port, () => {
    console.log(`AI Server app listening on port ${port}!`)
})