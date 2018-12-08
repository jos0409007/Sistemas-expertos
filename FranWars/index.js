var express = require("express");
var mysql = require("mysql");
var bodyParser = require("body-parser");
var app = express();
var credenciales = require("./conexion.js");

app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
  }));

//ruta que contiene todos los archvivos por proyecto
app.get("/archivos", function(req, res){
    var fecha = new Date();
    console.log("aqui " + fecha);
    var conexion =  mysql.createConnection(credenciales.credenciales);
    var sql = 'call arch_proyect(?)';

    conexion.query(sql,2,function(error,data,fields){
        console.log(error);
        /*
        console.log("Estoy aqui")
        for(var i = 0; i < data[0].length; i++){
            console.log(data[0][i]);
            console.log(data[0][i].TipoArchivoNombre);
        }
        */
        res.send(data[0]);
        
        conexion.end();
    });


});

//ruta que contiene todos los proyectos por usuario
app.get("/proyectos", function(req, res){

    var conexion =  mysql.createConnection(credenciales.credenciales);
    var sql = "call usr_proyecto(?)";
    conexion.query(sql, 1, function(error, data, fields){
        console.log(error);
        console.log("funciona");
        res.send(data[0]);
        conexion.end();
    });
    


});


app.post("/registrar", function(req, res){

 
    var conexion = mysql.createConnection(credenciales.credenciales);
    var sql = "insert into usuario(UsuarioNombre,UsuarioApellido,UsuarioNick, UsuarioCorreo, UsuarioRedSocial, UsuarioEstatus) values (?,?,?,?,?,?);";
    conexion.query(sql,
        [
            req.body.usuarioNombre,
            req.body.usuarioApellido,
            req.body.usuarioNick,
            req.body.usuarioCorreo,
            req.body.usuarioRedSocial,
            req.body.usuarioEstatus
        ], function(error, data, fields){
        if (error){
            res.send(error);
            res.end();
        }
        else{
            console.log("se ha  registrado correctamente");
            res.send(data);
            res.end();
        }
    });
    

});

//insert para registrar el plan del usuario
app.post("/registrar-plan",function(req,res){
    
    var conexion = mysql.createConnection(credenciales.credenciales);
    var sql = "insert into usuario_plan(UsuarioId,PlanId,FechaContrato,FechaCaducidad) values (?,?,date(now()),null);";
    conexion.query(sql,[req.body.usuarioId,req.body.planId], function(error,data,fields){
        if(error){
            res.send(error);
            res.end();
        }
        else{
            res.send(data);
            res.end();
        }
    });

});

//ruta para registrar proyectos
app.post("/registrar-proyecto", function(req,res){
    var sql = "insert into proyecto(ProyectoNombre,ProyectoDescripcion,UsuarioId) values (?,?,?);"
    var conexion = mysql.createConnection(credenciales.credenciales);
    conexion.query(sql,[req.body.proyectoNombre, req.body.proyectoDescripcion, req.body.usuarioId],
        function(error,data,fields){
            if (error){
                res.send(error);
                res.end();
            }
            else{
                res.send(data);
                res.end();
            }
        });
});

//funcion para registrar un archivo de proyecto
app.post("/registrar-archivo", function(req,res){
    var archivoSuperior = req.body.archivoSuperiorId;
    if (archivoSuperior == "")
        archivoSuperior = null;

    var sql = "insert into archivo(ProyectoId, ArchivoContenido,ArchivoNombre,ArchivoFecha, TipoArchivoId, ArchivoSuperiorId) values (?,?,?,now(),?,?);";
    var conexion = mysql.createConnection(credenciales.credenciales);
    conexion.query(sql, 
        [
            req.body.proyectoId, 
            req.body.archivoContenido,
            req.body.archivoNombre,
            req.body.tipoArchivo,
            archivoSuperior
        ],
        function(error,data,fields){
            if (error)
                res.send(error);
            else    
                res.send(data);
            
            res.end();
        });
});



app.listen(8001);