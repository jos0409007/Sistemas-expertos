var router = require("express").Router();
var bodyParser = require("body-parser");
var bd = require("./bd");

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
    extended: true
  }));
  
router.route("/")
    .get(function(req, res){

        var sql = 'select * from archivo where ArchivoId = ?';
        var arr = [req.query.archivoId];
        bd.query(sql,arr,res);

    })
    .post(function(req, res){
        var archivoSuperior = req.body.archivoSuperiorId;
        if (archivoSuperior == "")
            archivoSuperior = null;

        var sql = `insert into 
            archivo(ProyectoId, ArchivoContenido,ArchivoNombre,ArchivoFecha, TipoArchivo, ArchivoSuperiorId) 
            values (?,?,?,now(),?,?);`;
        
        var arr = [
            req.body.proyectoId, 
            req.body.archivoContenido,
            req.body.archivoNombre,
            req.body.tipoArchivo,
            archivoSuperior
        ];
        console.log(req.body);

        bd.query(sql,arr,res);

    })
    .put(function(req, res){
        var sql = `update archivo set ArchivoNombre = ?, 
        ArchivoContenido = ?, ArchivoFecha = now(), 
        ArchivoSuperiorId = ? where ArchivoId = ?;`;
        var arr = [req.body.archivoNombre, req.body.archivoContenido, req.body.archivoSuperiorId, req.body.archivoId];
        bd.query(sql,arr,res);
    })
    .delete(function(req, res){
        var sql = "delete from archivo where ArchivoId = ?;";
        var arr = [req.query.archivoId];
        bd.query(sql,arr,res);
    });

router.get("/all", function(req,res){
    var sql = 'call arch_proyect(?)';
    var arr = [req.query.proyectoId];
    bd.query(sql,arr,res);
});

router.get("/carpetas", function(req, res) {
   var sql = "select * from archivo where ProyectoId = ? and ArchivoSuperiorId is null;"; 
   var arr = [req.query.proyectoId];
   bd.query(sql,arr,res);
});

//funcion que devuelve todas las carpetas del proyecto.
//se utiliza para crear un nuevo archivo dentro de las carpetas.
router.get("/carp", function(req, res) {
   var sql = `select * from archivo where TipoArchivo = "Carpeta" and ProyectoId = ?;`
   var arr = [req.query.proyectoId];
   bd.query(sql,arr,res); 
});

router.get("/archivos", function(req, res) {
    var sql = `select * from archivo where ProyectoId = ? and ArchivoSuperiorId = ?;`
    var arr = [req.query.proyectoId, req.query.superiorId];
    bd.query(sql,arr,res); 
});
module.exports = router;