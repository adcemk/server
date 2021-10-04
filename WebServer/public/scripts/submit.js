var sendButton = document.getElementById('sendButton');

sendButton.addEventListener('click', transfer);

const tableURL = window.location.protocol + '//' + 'localhost:3000/table'
var ciclo = ""
var materias = []
var materiasSend = []
var json
var socketGlobal

function transfer(e){
  //Websocket creation 
  var socketProtocol = (window.location.protocol === 'https:' ? 'wss:' : 'ws:')
  var echoSocketUrl = socketProtocol + '//' + 'localhost:3001' + `/ai`
  socket = new WebSocket(echoSocketUrl);

  //On receive info from socket (response)
  socket.onmessage = function (event) {
    var data = {}
    try {
      data = JSON.parse(event.data)
    }catch{console.log(event.data)}
    
    if(data['type'] == 'horario') {
      materiasSend.push(data)
      console.log('horario', data)
    }
    else if(data['type'] == 'status') {
      console.log('status', data)
      //Finished
      if(data['body'] == 'finished'){
        socket.close()
        console.log('entered finished flag')
        sessionStorage.setItem('horarios', JSON.stringify(materiasSend))
        window.location.replace(tableURL)
      }
      //Generation Info
      else{}
    }  
  } 


  socket.onopen = e => {
    //On send info to AI Server
    ciclo = document.getElementById("ciclo").value
    elements = document.getElementsByClassName("arrayTest")
    for (let index = 0; index < elements.length; index++) {
      //console.log(elements[index].value)
      materias.push(elements[index].value)
    }
    // console.log("ciclo en submit.js: ",ciclo)
    // console.log("mateias en submit.js: ",materias)
    json = {
        'type':'request',
        "ciclo":ciclo,
        "materias":materias
    };

    console.log(json)

    socket.send(JSON.stringify(json))
  }

  socketGlobal = socket
  //$('#message').show();     
}