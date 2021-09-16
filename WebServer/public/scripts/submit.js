var sendButton = document.getElementById('sendButton');

sendButton.addEventListener('click', transfer);

var ciclo = ""
var materias = []
var json
var socketGlobal

function transfer(e){
  //On receive info from socket (response)
  var socketProtocol = (window.location.protocol === 'https:' ? 'wss:' : 'ws:')
  var echoSocketUrl = socketProtocol + '//' + 'localhost:3001' + `/ai`
  socket = new WebSocket(echoSocketUrl);

  socket.onmessage = function (event) {
    try {
      var data = JSON.parse(event.data)
    }catch{}
    
    console.log(data)

    if(data['type'] == 'horario') {
      // do something with the schedules
      //i.e.
      //insert all of the objects into a list
      //redirect with window.location to table.html with list as a parameter
      //or (probably better just create json string of list and use sessionStorage to retrieve in other html)
      console.log('horario', data)
    }
    else if(data['type'] == 'status') {
      // do something with the schedules
      //i.e.
      //insert all of the objects into a list
      //redirect with window.location to table.html with list as a parameter
      //or (probably better just create json string of list and use sessionStorage to retrieve in other html)
      console.log('status', data)
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

    socket.send(JSON.stringify(json))
  }

  socketGlobal = socket
  //$('#message').show();     
}