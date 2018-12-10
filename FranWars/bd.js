//archivo donde se ejecuta los procedimientos sql
//por que encapsularlo, bueno, siempre se hace el mismo procedimiento
//si retorna una respuesta o un error.

var credenciales = require("./conexion.js");
var mysql = require("mysql");

//esta funcion aplica para todos los query dml que se hagan
//funcion que obtiene la sentencia, el arreglo de parametros y el response que se envia.
module.exports.query = function(sql, arr, res){
    var conexion = mysql.createConnection(credenciales.credenciales);
    conexion.query(sql, arr, function(error, data, fields){
        if (error)
            res.send(error);
        else
            res.send(data);
        res.end();
    });
}