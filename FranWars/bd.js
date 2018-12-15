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

//querySession es una funcion que busca si el usuario existe, si este hace match en la base de datos
//se agregan las variables de id y tipo de usuario al request, luego estos son usados para la verificacion de permisos
module.exports.querySession = function(sql, arr,req, res){
   // console.log("veamos si esta llegando");
    var conexion = mysql.createConnection(credenciales.credenciales);
    conexion.query(sql, arr, function(error, data, fields){
        if (error)
            res.send(error);
        else{
            if (data.length == 1){
                //console.log(data[0].UsuarioId);
                req.session.usuarioId = data[0].UsuarioId;
                req.session.tipoUsuarioId = data[0].TipoUsuarioId;
                res.send(data);
            }
            
        }
            
        res.end();
    });
}