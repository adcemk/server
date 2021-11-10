var sendButton = document.getElementById('sendButton');

sendButton.addEventListener('click', transfer);
const socketProtocol = (window.location.protocol === 'https:' ? 'wss:' : 'ws:')
//const tableURL = window.location.protocol + '//' + 'web-server-amaury.herokuapp.com/table'
const tableURL = window.location.protocol + '//' + 'localhost:3000/table'
const noTableURL = window.location.protocol + '//' + 'localhost:3000/noTable'
//const echoSocketUrl = socketProtocol + '//' + 'ia-server-amaury.herokuapp.com'
var ciclo = ""
var materiasSend = []
var json
var socketGlobal
const regexCiclo = new RegExp('([0-9]{6})|([0-9]{4}[A-Z])');
const regexMateria = new RegExp('([A-Z][0-9]{4})|([A-Z]{2}[0-9]{3})');

function transfer(e){
  // Check for empty inputs or incorrect inputs
  var flag = false;
  //check for empty cicle
  var validCiclo = regexCiclo.test(document.getElementById("ciclo").value)
  if(!document.getElementById("ciclo").value || !validCiclo){
    var alert = document.getElementById('alertCiclo')
    if(alert === null){
      var span = '<span class="closebtn" onclick="this.parentElement.style.display=\'none\';">&times;</span> ';
      var message = 'El campo <strong>Ciclo</strong> está vacío o tiene formato invalido.';
      var alert = '<div class="alert" id="alertCiclo">' + span + message + '</div>';
      $("#form1").find("#sendButton").after(alert);
    }
    else {
      alert.style.display = "block";
    }
    flag=true;
  }
  //check for empty classes
  let checkEmptyClass = document.getElementsByClassName("arrayClass")
  for (let index = 0; index < checkEmptyClass.length; index++) {
    for (let jindex = 0; jindex < checkEmptyClass.length; jindex++){
      if(index != jindex){
        if(checkEmptyClass[index].value == checkEmptyClass[jindex].value){
          flag=true;
          var alert = document.getElementById('alertClass')
          var span = '<span class="closebtn" onclick="this.parentElement.style.display=\'none\';">&times;</span> ';
          var message = 'No se pueden repetir <strong>Claves</strong>.';
          if(alert === null){
            var alert = '<div class="alert" id="alertClass">' + span + message + '</div>';
            $("#form1").find("#sendButton").after(alert);
          }
          else {
            document.getElementById('alertClass').innerHTML = span + message
            alert.style.display = "block";
          }
        }
      }
    }
    var validMateria = regexMateria.test(checkEmptyClass[index].value)
    if(!checkEmptyClass[index].value || !validMateria){
      var alert = document.getElementById('alertClass')
      var span = '<span class="closebtn" onclick="this.parentElement.style.display=\'none\';">&times;</span> ';
      var message = 'Los campos <strong>Materia</strong> están vacíos o tiene formato invalido.';
      if(alert === null){
        var alert = '<div class="alert" id="alertClass">' + span + message + '</div>';
        $("#form1").find("#sendButton").after(alert);
      }
      else {
        document.getElementById('alertClass').innerHTML = span + message
        alert.style.display = "block";
      }
      flag=true;
    }
  }
  //return if empty or incorrect inputs
  if(flag === true){return}

  //Websocket creation 
  var socketProtocol = (window.location.protocol === 'https:' ? 'wss:' : 'ws:')
  var echoSocketUrl = socketProtocol + '//' + 'localhost:3001' + `/ai`
  //const echoSocketUrl = socketProtocol + '//' + 'ia-server-amaury.herokuapp.com/ai'
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
  title.innerHTML = "Recolectando Información..."
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
      if(data['empty']){
        socket.close()
        console.log("entered empty flag")
        window.location.assign(noTableURL)
      }
      else if(data['body'] == 'finished'){
        socket.close()
        console.log('entered finished flag')
        sessionStorage.setItem('horarios', JSON.stringify(materiasSend))
        window.location.assign(tableURL)
      }
      //Generation Info
      else{
        title.innerHTML = "Generando Horarios:"
        percent.innerHTML = data['body'] + "%"
        if(data['body'] == 100){
          title.innerHTML = "Generando tablas..."
          percent.remove()
        }
      }
    }
  } 


  socket.onopen = e => {
    //On send info to AI Server
    var materias = []
    ciclo = document.getElementById("ciclo").value
    var speed = $('input[name="speed"]:checked').val();
    elements = document.getElementsByClassName("arrayClass")
    for (let index = 0; index < elements.length; index++) {
      materias.push(elements[index].value)
    }
    json = {
        'type':'request',
        "ciclo":ciclo,
        "materias":materias,
        "velocidad":speed
    };
    console.log(json)

    socket.send(JSON.stringify(json))
  }

  socketGlobal = socket    
}