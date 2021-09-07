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

app.ws('/ai', (ws, req) => {
    ws.on('message', msg => {
        var data = JSON.parse(msg)
        if(data['type'] == 'first') {
  
            const python = spawn('python', ['script1.py', contentFileName, styleFileName, resultFileName, epochs, lr]);
    
            python.stdout.on('data', (data) => {
                ws.send(JSON.stringify({
                'type':'notres',
                'body': data.toString()
                }))
            });
    
            python.on('close', (code) => {
                console.log(`child process close all stdo with code ${code}`);
                // var dataX = "data:image/"+data.ext+";base64," + Buffer.from(data).toString('base64')
                // var json={ 'type':'res', 'img':dataX };
                // ws.send(JSON.stringify(json))
            });
        }
        else{
        }
    })
})