/**
 * Created by Curso on 17/05/2017.
 */
"use strict";
import  * as service from "./genericservice";
const urlObras = "http://localhost:8080/gestiongaleria/api/obras";
export  class ObraService extends service.GenericService{
    constructor(){
        super();
        this._codigo = "";
        this._nombre = "";
        this._descripcion = "";
    }
    getAll() {
        return super.ajax(urlObras,"get", null);
    }
    getById(codigo){
        return super.ajax(urlObras+"/"+codigo,"get",null);
    }

}


function  parseForm(obra) {
    let txt="";
    txt="<form action='#' id='alumnoForm' method='post'>";
    txt+="<input type='text' name='nombre' id='nombre' value='"+obra.nombre()+"'>";
    txt+="</form>";
    return txt;
}

export  function rederizarFormulario(codigo = -1){
    let os = new ObraService();
    let obra = new Obra();
    let txt ="";
    return new Promise(function(resolve, reject) {
        if(codigo > -1){
            as.getById(codigo)
                .then(function(obra){
                    txt = parseForm(obra);
                    resolve(txt);
                })
                .catch(function () {
                    reject("No se han podido acceder a los datos del codigo "+codigo);
                });
        }else{
            txt = parseForm(obra);
            resolve(txt);
        }
    });


    //rellaner datos en el form
}

export function renderizar () {
    let os = new ObraService();
    let txt = "";
    return new Promise(function(resolve, reject) {
        as.getAll().then(function(data) {
            let obras = JSON.parse(data);
            if (obras.length > 0) {
                txt ="<table id='tablaObras' class='rwd-table'><thead><tr>"
                    +"<th><input type='checkbox' name='borrartodos' id='borrartodos'/></th>"
                    +"<th>Nombre</th>"
                    +"<th>Descripcion</th>"
                    +"<th></th></tr></thead><tbody>";
                for (let i = 0; i < obras.length; i++) {
                    let obras = obras[i];
                    console.log(obra);
                    txt += parseObra(obra);
                }
                txt+="</tbody><tfoot><tr><td colspan='6'>Total Alumnos: "+alumnos.length+"</td></tr></tfoot></table>";
            }else{
                txt ="no se encuentran alumnos en la BBDD";
            }
            resolve(txt)
        }, function(error) {//error
            console.log(error);
            txt ="error en la carga de alumnos";
            reject(txt);
        });
    });
}
function parseObra (obra){
    let codigo = obra.codigo;
    let nombre = obra.nombre;
    let descripcion = obra.descripcion();

    let htmlEdit ="<button>Editar</button>";
    let htmlDelete ="<button>Borrar</button>";

    let texto = "<tr><td><input type='checkbox' value='" + codigo + "'></td><td>"+nombre+"</td><td>"+descripcion+"</td><td>"+htmlEdit+htmlDelete+"</td></tr>";

    return texto;
}
export class Obra {
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
