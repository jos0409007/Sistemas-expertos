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

var usuarioId;
var tipoUsuarioId;

app.use(session({ secret: "ASDFE$%#%", resave: true, saveUninitialized: true }));


//middleware que se usa para obtener la sesion que se acaba de iniciar
app.use(function(req, res, next){
    if (req.session.usuarioId){
        usuarioId =  req.session.usuarioId;
        tipoUsuarioId =  req.session.tipoUsuarioId;
    }
    next();
});

//middleware que verifica que la sesion ha sido iniciada, de lo contrario devolvera una pantalla con error
function verificarAutenticacion(req, res, next){
    if(req.session.usuarioId){
        console.log("la sesion esta iniciada");
        return next();
    }
	else{
        res.redirect("/");
        //res.send("ERROR, ACCESO NO AUTORIZADO");
       
    }
       
}

//inicia sesion de usuario, querySession es un metodo unico, el cual agrega las variables de sesion al request
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

//esta funcion unicamente envia mediante el api las credenciales del usuario logueado
app.get("/obtener-usuario", function(req,res){
   var usuario = {
        usuarioId: usuarioId,
        tipoUsuarioId: tipoUsuarioId
    }
    res.send(usuario);
});

app.get("/", function(req, res){
    res.sendFile(path.join(__dirname + '/public/index.html'));
});

app.get("/cerrar-sesion",function(req,res){
    req.session.destroy();
    res.send("Sesion eliminada");
    res.redirect("/");
    res.end();
});


app.listen(8001);