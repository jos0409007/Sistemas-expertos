var router = require("express").Router();
var bodyParser = require("body-parser");
var bd = require("./bd");


router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
    extended: true
  }));
  
router.route("/")
    .get(function(req, res){
        var sql = "call pro_chat(?)";
        var arr = [req.query.proyectoId];
        bd.query(sql,arr,res);
    })
    .post(function(req, res){
        var sql = "insert into chat(ColaboradorId, ProyectoId,ChatMensaje, ChatFecha) values (?,?,?,now());";
        var arr = [req.body.colaboradorId, req.body.proyectoId, req.body.mensaje];
        bd.query(sql,arr,res);
    })
 

module.exports = router;

//revisado