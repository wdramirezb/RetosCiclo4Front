function validarDatosIngreso(){
    const usuario=document.getElementById('usuario');
    const clave=document.getElementById('clave');
    console.log(usuario.value);
    console.log(clave.value);

    if (usuario.value.length==0) {
        alert("Tiene que escribir su correo electónico")
        usuario.focus()
        return 0;        
    } else if (clave.value.length==0) {
        alert("Tiene que escribir su contraseña")
        clave.focus()
        return 0;
    } else {
        consultarUsuario(usuario.value, clave.value);
    }
}

function consultarUsuario(email, clave){
    $.ajax({
        url: "http://localhost:8080/api/user/" + email + "/" + clave,
        type: "GET",
        datatype: "JSON",
        success: function (respuestalogin) {
            console.log(respuestalogin);
            if (respuestalogin.name == "NO DEFINIDO"){
                alert("El correo o contraseña es incorrecto.  Intente de nuevo.");
            }else{
                localStorage.setItem("usuario", respuestalogin.name);
                window.location.href = "/catalogo.html";
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert("No se pudo verificar usuario y contraseña.  Intente de nuevo.");
        },
    });
}