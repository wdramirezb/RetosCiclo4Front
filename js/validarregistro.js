function validarDatosRegistro(){
    const usuario=document.getElementById('usuario');
    const email=document.getElementById('email');    
    const clave1=document.getElementById('clave1');
    const clave2=document.getElementById('clave2');
    const expReg=/^([\da-z_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;

    //console.log(usuario.value);
    //console.log(email.value);
    //console.log(clave1.value);
    //console.log(clave2.value);

    if (usuario.value.length==0) {
        alert("Tiene que escribir su nombre de usario")
        usuario.focus()
        return 0;        
    } else if (email.value.length==0) {
        alert("Tiene que escribir su correo electrónico")
        email.focus()
        return 0;        
    } else if (expReg.test(email.value)==false) {
        alert("Tiene que escribir un correo electrónico valido")
        email.focus()
        return 0;
    } else if (clave1.value.length==0) {
        alert("Tiene que escribir una contraseña")
        clave1.focus()
        return 0;
    } else if (clave2.value.length==0) {
        alert("Tiene que confirmar la contraseña")
        clave2.focus()
        return 0;
    } else if (clave1.value!=clave2.value) {
        alert("Ambas contraseñas deben coincidir")
        clave1.focus();
        clave2.focus();
        return 0;
    } else {
        consultarExistenciaUsuario(email.value, usuario.value, clave1.value);
    }
}


function consultarExistenciaUsuario(email, usuario, clave){
    //console.log(email);
    $.ajax({
        //url: "http://localhost:8080/api/user/" + email,
        url: "http://129.151.122.81:8080/api/user/" + email,
        type: "GET",
        data: email,
        datatype: "JSON",
        success: function (respuestaregistro) {
            //console.log(respuestaregistro)
            if (respuestaregistro == false){
                crearUsuario(email, usuario, clave);
            } else {
                alert("No fue posible crear la cuenta. El correo " + email + " ya existe en el sistema. Indique otro correo.");
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert("No se pudo verificar la información.");
        },
    });
}

function crearUsuario(email, usuario, clave){
    //console.log(email, usuario, clave);
    let nuevoUsuario = {
        name: $("#usuario").val(),
        email: $("#email").val(),
        password: $("#clave1").val()};
    //console.log(nuevoUsuario);
    $.ajax({
        //url: "http://localhost:8080/api/user/new",
        url: "http://129.151.122.81:8080/api/user/new",
        type: "POST",
        contentType: "application/json; charset=utf-8",
        dataType: "JSON",
        data: JSON.stringify(nuevoUsuario),
        success: function (respuesta) {
            alert("Cuenta creada de forma correcta. Ahora ingrese con su correo y contraseña.");
            window.location.href = "index.html";
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert("No fue posible crear la cuenta. Por favor intente de nuevo");
        },
    });
}