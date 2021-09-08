var sendButton = document.getElementById('sendButton');

sendButton.addEventListener('click', transfer);

var ciclo = ""
var materias = []

//On receive info from socket (response)
var json
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
function transfer(e){
  ciclo = document.getElementById("ciclo").value
  //elements = document.getElementsByClassName("materia")
  elements = document.getElementsByClassName("arrayTest")
  for (let index = 0; index < elements.length; index++) {
    //const element = array[index];
    console.log(elements[index].value)
    materias.push(elements[index].value)
  }

  console.log("ciclo en submit.js: ",ciclo)
  console.log("mateias en submit.js: ",materias)
  json = {
      'type':'first',
      "ciclo":ciclo,
      "materias":materias
  };
  
  socket.send(JSON.stringify(json))
  $('#message').show();     
}