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
    if(data['type'] == 'horario') {
      // do something with the schedules
      //i.e.
      //insert all of the objects into a list
      //redirect with window.location to table.html with list as a parameter
      //or (probably better just create json string of list and use sessionStorage to retrieve in other html)
      console.log(data)
    }
    else {
      console.log(data)
      if(data['body'] == 'finished'){
        socket.close()
      } else {
        //do something with the status info
      }
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