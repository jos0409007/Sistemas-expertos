var router = require("express").Router();
var bodyParser = require("body-parser");
var bd = require("./bd");

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
    extended: true
  }));
  
router.route("/")
    .get(function(req, res){

        //despues de seleccionar en la tarjeta se llamara el procedimiento de arch_proyect
        var sql = "call usr_proyecto(?)";
        var arr = [req.query.usuarioId];
        bd.query(sql,arr,res);
        
    })
    .post(function(req, res){

        var sql = "call crear_proyecto(?,?,?);";
        var arr = [req.body.proyectoNombre, req.body.proyectoDescripcion, req.body.usuarioId];
        bd.query(sql,arr,res);

    })
    .put(function(req, res){

        var sql = `update proyecto set
        ProyectoNombre = ?, 
        ProyectoDescripcion = ? 
        where ProyectoId = ?;`
        
        var arr = [req.body.proyectoNombre, req.body.proyectoDescripcion, req.body.proyectoId];
        //console.log("estoy en el actualizar de proyecto");
        //console.log(arr);
        //console.log(req);

        bd.query(sql,arr,res);

    })
    .delete(function(req, res){

        var sql = "call eliminar_proyecto(?)";
        var arr = [req.body.proyectoId];
        bd.query(sql,arr,res);
        
    });

module.exports = router;

//revisado