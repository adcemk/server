var sendButton = document.getElementById('sendButton');

sendButton.addEventListener('click', transfer);

var ciclo = ""
var materias = []
var json




function transfer(e){
  //On receive info from socket (response)
  var socketProtocol = (window.location.protocol === 'https:' ? 'wss:' : 'ws:')
  var echoSocketUrl = socketProtocol + '//' + 'localhost:3001' + `/ai`
  socket = new WebSocket(echoSocketUrl);
  socket.onmessage = e => {
    var data = JSON.parse(e.data)
    if(data['type'] == 'res') {
      console.log(data)
      socket.close()
    }
    else {
      console.log(data)
    }   
  } 

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

  socket.send(JSON.stringify(json))
  //$('#message').show();     
}