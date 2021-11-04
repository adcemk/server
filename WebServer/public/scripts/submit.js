var sendButton = document.getElementById('sendButton');

sendButton.addEventListener('click', transfer);
const socketProtocol = (window.location.protocol === 'https:' ? 'wss:' : 'ws:')
const tableURL = window.location.protocol + '//' + 'web-server-amaury.herokuapp.com/table'
const echoSocketUrl = socketProtocol + '//' + 'ia-server-amaury.herokuapp.com'
var ciclo = ""
var materiasSend = []
var json
var socketGlobal

function transfer(e){
  // Check for empty inputs
  var flag = false;

  if(!document.getElementById("ciclo").value){
    var alert = document.getElementById('alertCiclo')
    if(alert === null){
      var span = '<span class="closebtn" onclick="this.parentElement.style.display=\'none\';">&times;</span> ';
      var message = 'Ingresa un ciclo.';
      var alert = '<div class="alert" id="alertCiclo">' + span + message + '</div>';
      $("#form1").find("#sendButton").after(alert);
    }
    else {
      alert.style.display = "block";
    }
    flag=true;
  }

  let checkEmptyClass = document.getElementsByClassName("arrayClass")
  for (let index = 0; index < checkEmptyClass.length; index++) {
    if(!checkEmptyClass[index].value){
      var alert = document.getElementById('alertClass')
      if(alert === null){
        var span = '<span class="closebtn" onclick="this.parentElement.style.display=\'none\';">&times;</span> ';
        var message = 'Debes llenar todos los campos de <strong>Materia</strong>.';
        var alert = '<div class="alert" id="alertClass">' + span + message + '</div>';
        $("#form1").find("#sendButton").after(alert);
      }
      else {
        alert.style.display = "block";
      }
      flag=true;
    }
  }

  if(flag === true){return}

  //Websocket creation 
  var socketProtocol = (window.location.protocol === 'https:' ? 'wss:' : 'ws:')
  //var echoSocketUrl = socketProtocol + '//' + 'localhost:3001' + `/ai`
  const echoSocketUrl = socketProtocol + '//' + 'ia-server-amaury.herokuapp.com/ai'
  socket = new WebSocket(echoSocketUrl);
  //Delete add, delete and send buttons
  let send = document.getElementById("sendButton")
  let add = document.getElementById("add")
  send.remove()
  add.remove()
  let removes = document.getElementsByClassName("remove-materia")
  let len = removes.length
  for (var i=0; i<len; i=i+1) {
    removes[0].remove()
  }
  //creates div to show percentage of schedule generations completion
  let div = document.createElement("div")
  let title = document.createElement("h2")
  let percent = document.createElement("h3")
  div.classList.add("percentage")
  title.innerHTML = "Generación de Horarios:"
  div.appendChild(title)
  div.appendChild(percent)
  document.getElementById('container').appendChild(div)

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
      else{
        percent.innerHTML = data['body'] + "%"
      }
    }  
  } 


  socket.onopen = e => {
    //On send info to AI Server
    var materias = []
    ciclo = document.getElementById("ciclo").value
    elements = document.getElementsByClassName("arrayClass")
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