/**
 * Created by Curso on 17/05/2017.
 */
"use strict";
import  * as service from "./genericservice";
const urlPintores = "http://localhost:8080/gestiongaleria/api/pintores";
export  class PintorService extends service.GenericService{
    constructor(){
        super();
        this._codigo = "";
        this._nombre = "";
        this._descripcion = "";
    }
    getAll() {
        return super.ajax(urlPintores,"get", null);
    }
    getById(codigo){
        return super.ajax(urlPintores+"/"+codigo,"get",null);
    }
    
}
export class Pintor {
    constructor(codigo, nombre, descripcion) {
        this._codigo = codigo;
        this._nombre = nombre;
        this._descripcion = descripcion;
    }

    get codigo() {
        return this._codigo;
    }
    set codigo(codigo) {
        this._codigo = codigo;
    }
    get nombre(){
        return this._nombre;
    }
    set nombre(nombre){
        this._nombre=nombre;
    }
    get descripcion(){
        return this._descripcion;
    }
    set descripcion(descripcion){
        this._descripcion;
    }
}

function  parseForm(pintor) {
    let txt="";
    txt="<form action='#' id='alumnoForm' method='post'>";
    txt+="<input type='text' name='nombre' id='nombre' value='"+pintor.nombre()+"'>";
    txt+="</form>";
    return txt;
}






/*
var Pintor =function (codigo,nombre,descripcion) {
    this.codigo = codigo;
    this.nombre = nombre;
    this.descripcion = descripcion;

    var self = this;

    return {
        delete: function () {
            ajax({url:urlPintores+"/"+this.codigo,method:"delete"});
        },
        getById: function () {
            ajax({url:urlPintores+"/"+this.codigo,method:"get"})
            .then(function (data) {
                return data;
            })
        },
        update: function () {
            ajax({url:urlPintores+"/"+this.codigo,method:"put",data:self});
        },
        create: function () {
            ajax({url:urlPintores,method:"post",data:self})
                .then(function (data) {
                    return data;
                })
        }
    }
}
function mostrarPintores(pintores) {
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
function getAll() {
    ajax({"url": urlPintores, "method": "get"})
        .then(
            function (data) {
                return data;
            }
        )
        .catch(function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR);
            //gestión de errores del primer metodo.
        });
}
function ajax(opciones) {
    return new Promise(function (resolve, reject) {
        $.ajax(opciones).done(resolve).fail(reject);
    });
}
*/
