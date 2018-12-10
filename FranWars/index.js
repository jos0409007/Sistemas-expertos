var express = require("express");
var app = express();
var archivo = require("./archivo.js");
var proyecto = require("./proyecto.js");
var plan = require("./plan.js");
var planUsuario = require("./plan-usuario");
var usuario = require("./usuario");
var colaborador = require("./colaborador");
var chat =  require("./chat");

app.use(express.static("public"));
app.use("/archivo", archivo);
app.use("/proyecto", proyecto);
app.use("/plan", plan);
app.use("/plan-usuario",planUsuario);
app.use("/usuario", usuario);
app.use("/colaborador",colaborador);
app.use("/chat", chat);

/*observacion importante

falta un select por archivo individual,
falta un select por usuario, que contenga el plan

no borrar las rutas hasta que este seguro que todas funcionan y despues ver como jalar desde el cliente
o sea, borrar hasta el final.

*/
//app.use(bodyParser.json());
/*app.use(bodyParser.urlencoded({
    extended: true
  }));
*/

//ruta que contiene todos los archvivos por proyecto
/*
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
        
        res.send(data[0]);
        
        conexion.end();
    });


});
*/

//ruta que contiene todos los proyectos por usuario

/*
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
*/

//funcion para registrar usuarios
/*
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
*/
//insert para registrar el plan del usuario
/*
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

*/
//ruta para registrar proyectos
/*
app.post("/registrar-proyecto", function(req,res){
    var sql = "insert into proyecto(ProyectoNombre,ProyectoDescripcion,UsuarioId) values (?,?,?);";
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
*/

//funcion para registrar un archivo de proyecto
/*
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
*/


//funcion para registrar colaboradores en un proyecto
/*
app.post("/registrar-colaborador", function(req,res){

    var conexion = mysql.createConnection(credenciales.credenciales);
    var sql = "insert into colaborador(ProyectoId, ColaboradorId) values (?,?);";
    conexion.query(sql, [req.body.proyectoId, req.body.colaboradorId], function(error, data, fields){
        if (error)
            res.send(error);
        else
            res.send(data);
        
        res.end();
    });

});
*/


//registrar mensajes de chat en proyecto
/*
app.post("enviar-mensaje", function(req,res){
    var sql = "insert into chat(ColaboradorId, ProyectoId,ChatMensaje, ChatFecha) values (?,?,?,now());";
    var conexion =  mysql.createConnection(credenciales.credenciales);
    conexion.query(sql, [req.body.colaboradorId, req.body.proyectoId, req.body.mensaje], 
        function(error, data, fields){
            if (error)
                res.send(error);
            else
                res.send(data);
            
            res.end();
        });
});
*/

app.listen(8001);