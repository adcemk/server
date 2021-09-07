var sendButton = document.getElementById('sendButton');

sendButton.addEventListener('click', transfer);

//On receive info from socket (response)
var json
var socketProtocol = (window.location.protocol === 'https:' ? 'wss:' : 'ws:')
var echoSocketUrl = socketProtocol + '//' + 'localhost:3001' + `/${sessionStorage.user}/process/`
socket = new WebSocket(echoSocketUrl);
socket.onmessage = e => {
  var data = JSON.parse(e.data)
  if(data['type'] == 'res') {
    imageR = new Image();
    imageR.onload = function() { ctxR.drawImage(imageR,0,0,250,250); }
    imageR.src = data['img']; 
    $('#message').hide(); 
    $('#learningRate').hide();
    $('#contenido').show(); 
    $('#sendImg').hide();
    $('#epochs').hide();
    $('#saveStyle').show(); 
    $('#nameStyle').show(); 
    socket.close()
  }
  else {
    console.log(data)
  }   
} 


//On send info to AI Server
function transfer(e){
    json = {
        'type':'first',
        "ext":imgExt,
        "img":img 
    };
    
    socket.send(JSON.stringify(json))
    $('#message').show(); 
      
}