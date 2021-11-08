// Elements for Ciclo Modal
var modalCiclo = document.getElementById("cicloModal");
var btnCiclo = document.getElementById("cicloInfo");
var spanCiclo = document.getElementById('cicloModalClose');

//Elements for Materia Modal
var modalMateria = document.getElementById("materiaModal");
var btnMateria = document.getElementById("materiaInfo");
var spanMateria = document.getElementById('materiaModalClose');

//Functions for Ciclo Modal
btnCiclo.onclick = function() {
    modalCiclo.style.display = "block";
}

spanCiclo.onclick = function() {
    modalCiclo.style.display = "none";
}

//Functions for Materia Modal
btnMateria.onclick = function() {
    modalMateria.style.display = "block";
}

spanMateria.onclick = function() {
    modalMateria.style.display = "none";
}

//Window click close modals
window.onclick = function(event) {
  if (event.target == modalMateria || event.target == modalCiclo) {
    modalMateria.style.display = "none";
    modalCiclo.style.display = "none";
  }
}