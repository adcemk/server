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

    // var ciclo = req.body.ciclo;
    // var materias = req.body.materias;
    var dataToSend;
    var ciclo = "damn";
    var materias = "son";
  
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
        let schedules = []
        if(data['type'] == 'request') {
  
            const python = spawn('python', ['ai_script.py', data.ciclo, data.materias]);
    
            python.stdout.on('data', (data) => {
                msg = JSON.parse(data.toString())
                if(msg['type'] == 'status'){
                    ws.send(msg.toString())
                }else{
                    schedules.push(msg.toString())
                }
            });
    
            python.on('close', (code) => {
                console.log(`child process close all stdo with code ${code}`);
                //Send all schedules on child process close
                schedules.forEach(schedule => {
                    ws.send(schedule)
                });
                //Send finished flag on close?
            });
        }
    })
    ws.on('close', msg => {
        console.log('Closed connection')
    })
})