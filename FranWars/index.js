var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var path = require("path");
var session = require("express-session");

var archivo = require("./archivo.js");
var proyecto = require("./proyecto.js");
var plan = require("./plan.js");
var planUsuario = require("./plan-usuario");
var usuario = require("./usuario");
var colaborador = require("./colaborador");
var chat =  require("./chat");
var bd = require("./bd");


app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use("/archivo", archivo);
app.use("/proyecto", proyecto);
app.use("/plan", plan);
app.use("/plan-usuario",planUsuario);
app.use("/usuario", usuario);
app.use("/colaborador",colaborador);
app.use("/chat", chat);

app.use(session({ secret: "ASDFE$%#%", resave: true, saveUninitialized: true }));


function verificarAutenticacion(req, res, next){
    if(req.session.usuarioId){
        console.log("la sesion esta iniciada");
        return next();
    }
	else
		res.send("ERROR, ACCESO NO AUTORIZADO");
}

app.post("/login", function(req, res){

    console.log("entre");
    
    var sql = `select UsuarioId, TipoUsuarioId
    from usuario where (UsuarioCorreo = ? or UsuarioNick = ?) and UsuarioPassword = sha1(?);`;
    var arr = [req.body.usuarioCorreo, req.body.usuarioNick, req.body.usuarioPassword];
    console.log(arr);

    bd.querySession(sql,arr,req,res); 


});

app.get("/dashboard", verificarAutenticacion,function(req,res){
    res.sendFile(path.join(__dirname + '/public/dashboard.html'));
});

app.get("/cerrar-sesion",function(req,res){
    req.session.destroy();
    res.send("Sesion eliminada");
    res.end();
});


app.listen(8001);