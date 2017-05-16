var $=require('jquery');

var pintores=[
{"codigo":1,"nombre":"Pablo Picasso","descripcion":"Pablo Ruiz Picasso1 (Málaga, 25 de octubre de 1881-Mougins, 8 de abril de 1973)"},
{"codigo":2,"nombre":"Salvador Dali","descripcion":"Salvador Felipe Jacinto Dalí i Domènech,1 marqués de Dalí de Púbol (Figueras, 11 de mayo de 1904-ibídem, 23 de enero de 1989)"},
{"codigo":3,"nombre":"Vincent van Gogh","descripcion":"Vincent Willem van Gogh(Zundert, Países Bajos, 30 de marzo de 1853-Auvers-sur-Oise, Francia, 29 de julio de 1890)"},
{"codigo":4,"nombre":"Claude Monet","descripcion":"Oscar-Claude Monet (París, 14 de noviembre de 1840-Giverny, 5 de diciembre de 1926)"},
{"codigo":5,"nombre":"El Greco","descripcion":"Doménikos Theotokópoulos (Candía, 1541-Toledo, 1614), conocido como el Greco («el griego»)"}
];
var obras=[{"codigo":1,"nombre":"Maternidad","descripcion":"La imagen de la maternidad es una de las más características de la época azul de Pablo Picasso (1901-1904): este cuadro corresponde a dicho periodo."}
,{"codigo":2,"nombre":"El Guernica","descripcion":"Guernica es un famoso cuadro de Pablo Picasso, pintado entre los meses de mayo y junio de 1937, cuyo título alude al bombardeo de Guernica, ocurrido el 26 de abril de dicho año, durante la Guerra Civil Española."},
    {"codigo":3,"nombre":"Los tres músicos","descripcion":"Este cuadro, pintado por Pablo Ruiz Picasso durante su estancia en Fontainebleau, en verano de 1921, es una de sus obras más célebres de lo que se ha llamado cubismo sintético"}
];
$.noConflict();
$(document).ready(function($) {
    // Code that uses jQuery's $ can follow here.
    $("#contactForm").on("submit",validarFormularioContacto);
    $("#listadoPintores div a:last-child").click(borrarVarios);
    $("#tablaPintores tbody").on("click","td:last-child button:last-child",function(){
        //alert("has pulsado el boton de borrado");
        var codigo = $(this).parents("tr").find("input[type=checkbox]").val();

        //alert(codigo);
        $(this).parents("tr").remove();
    });
    $("#tablaPintores tbody").on("click","td:last-child button:first-child",function(){
        alert("has pulsado el boton de actualizar");
        var codigo = $(this).parents("tr").find("input[type=checkbox]").val();
        var nombre=$(this).parents("tr").find("td:nth-child(2)").text();
        var descripcion=$(this).parents("tr").find("td:nth-child(3)").text();

    });
    $("#listadoObras div a:last-child").click(borrarVarios);
    $("#tablaObras tbody").on("click","td:last-child button:last-child",function(){
        //alert("has pulsado el boton de borrado");
        var codigo = $(this).parents("tr").find("input[type=checkbox]").val();

        //alert(codigo);
        $(this).parents("tr").remove();
    });
    $("#tablaObras tbody").on("click","td:last-child button:first-child",function(){
        alert("has pulsado el boton de actualizar");
        var codigo = $(this).parents("tr").find("input[type=checkbox]").val();
        var nombre=$(this).parents("tr").find("td:nth-child(2)").text();
        var descripcion=$(this).parents("tr").find("td:nth-child(3)").text();

    });
    $("#borrartodos").click(function (event) {
        if($(this).is(":checked")) {
            $("tbody input[type=checkbox]").prop("checked", true);
        }else {
            $("tbody input[type=checkbox]").prop("checked", false);
        }
    });
    function borrarVarios() {
        //recoger los checkboxes marcados
        $("#tablaPintores tbody input[type=checkbox]:checked").each(function () {
            var codigo=$(this).val();
            //llamar al rest
            $(this).parents("tr").remove();
            //actualizar el nº de pintores
        });
        $("#tablaObras tbody input[type=checkbox]:checked").each(function () {
            var codigo=$(this).val();
            //llamar al rest
            $(this).parents("tr").remove();
            //actualizar el nº de obras
        });

    }
    function validarFormularioContacto(){
        //recoger los valores de la vista
        var pdni = $("#dni").val();
        var pnombre = $("#nombre").val();
        var papellidos = $("#apellidos").val();
        var ptelefono = $("#telefono").val();
        var valido=false;
        //evaluarlos
        var dniValido= validarDni(pdni); //en funcion de si estan bien o mal o se envia o no
        var nomValido=validarNombre(pnombre);
        var apeValido=validarApellidos(papellidos);
        var teleValido=validarTelefono(ptelefono);
        if(dniValido&&nomValido&&apeValido&&teleValido){
            valido=true;
            $("#dni").siblings("div.text-error").text("");
            $("#nombre").siblings("div.text-error").text("");
            $("#apellidos").siblings("div.text-error").text("");
            $("#telefono").siblings("div.text-error").text("");
            // $("#contactForm").submit();//se envia el Formulario(Consumir REST)
        }else {
            if(!dniValido) {
                //mostar mensaje de error
                $("#dni").siblings("div.text-error").text("El DNI esta mal formado");
                //text y html
            }
            if(!nomValido){
                $("#nombre").siblings("div.text-error").text("El nombre tiene que tener al menos 3 letras");
            }
            if(!apeValido){
                $("#apellidos").siblings("div.text-error").text("Los apellidos tienen que tener al menos de 2 letras");
            }
            if(!teleValido){
                $("#telefono").siblings("div.text-error").text("El telefono no es valido, tiene que tener 9 digitos");
            }
        }
        return false;
    }
    cargarArrayPintores();
    function cargarArrayPintores() {
        //recorrer el array
        if(pintores.length > 0) {
            for(var i = 0; i < pintores.length; i++) {
                console.log(pintores[i]);
                var codigo = pintores[i].codigo;
                var nombre = pintores[i].nombre;
                var descripcion = pintores[i].descripcion;

                var htmlEdit = "<button>Editar</button>";
                var htmlDelete = "<button>Borrar</button>";

                var texto = "<tr><td><input type='checkbox' value='" + codigo + "'></td><td>"+nombre+"</td><td>"+descripcion+"</td><td>"+htmlEdit+htmlDelete+"</td></tr>";

                //añadir el html correspondiente a la página
                $("#tablaPintores tbody").append(texto);
                //-->

            }
            $("#tablaPintores tfoot td").html("<span class='text-error'>Total pintores:</span>" + obras.length);
        }else{
            $("#tablaPintores").remove();
            $("#listadoPintores").text("No se han encontrado pintores");
        }
    }

    cargarArrayObras();
    function cargarArrayObras() {
        //recorrer el array
        if(obras.length > 0) {
            for(var i = 0; i < obras.length; i++) {
                console.log(obras[i]);
                var codigo = obras[i].codigo;
                var nombre = obras[i].nombre;
                var descripcion = obras[i].descripcion;

                var htmlEdit = "<button>Editar</button>";
                var htmlDelete = "<button>Borrar</button>";

                var texto = "<tr><td><input type='checkbox' value='" + codigo + "'></td><td>"+nombre+"</td><td>"+descripcion+"</td><td>"+htmlEdit+htmlDelete+"</td></tr>";

                //añadir el html correspondiente a la página
                $("#tablaObras tbody").append(texto);
                //-->
            }
            $("#tablaObras tfoot td").html("<span class='text-error'>Total obras:</span>" + pintores.length);
        }else{
            $("#tablaObras").remove();
            $("#listadoObras").text("No se han encontrado obras");
        }
    }
});


function  validarNombre(nombre) {
    const pattern=new RegExp(/[a-zA-Z]{3,}/);
    return pattern.test(nombre);
}
function validarApellidos(apellidos) {
    const pattern=new RegExp(/[a-zA-Z]{2,}\s[a-zA-Z]{2,}/);
    return pattern.test(apellidos);
}
function validarTelefono(telefono) {
    var valido=true;
    const pattern = new RegExp(/\d{9}/);
    if(telefono!="") {
        valido=pattern.test(telefono);
    }
    return valido;
}
function validarDni(dni) {
    var valido =true;
    const pattern=new RegExp(/\d{8}[a-z][A-Z]/);
    if(pattern.test(dni)) {
        numero = parseInt(dni.substr(0, dni.length - 1), 10);
        letr = dni.substr(dni.length - 1, 1);
        numero = numero % 23;
        letra = 'TRWAGMYFPDXBNJZSQVHLCKET';
        letra = letra.substring(numero, numero + 1);
        if (letra != letr.toUpperCase()) {
            valido = false;
        }
    }
    return valido;
}
