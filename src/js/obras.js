/**
 * Created by Curso on 17/05/2017.
 */
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
