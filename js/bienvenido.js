$(document).ready(function(){
    bienvenido()
});


function bienvenido() {
    var nombre = localStorage.getItem("usuario");
    $("#nombreUsuario").val(nombre);
}