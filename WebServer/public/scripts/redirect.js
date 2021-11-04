const formURL = window.location.protocol + '//' + 'web-server-amaury.herokuapp.com/'
const instructionsURL = window.location.protocol + '//' + 'web-server-amaury.herokuapp.com/instructions'

var instructions = document.getElementById('instrucciones')
var form = document.getElementById('formulario')

instructions.addEventListener('click', redirectInstructions);
form.addEventListener('click', redirectForm);

function redirectInstructions(e){
    window.location.href = instructionsURL;
}

function redirectForm(e){
    window.location.href = formURL;
}