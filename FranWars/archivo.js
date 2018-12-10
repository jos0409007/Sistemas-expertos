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
            archivo(ProyectoId, ArchivoContenido,ArchivoNombre,ArchivoFecha, TipoArchivoId, ArchivoSuperiorId) 
            values (?,?,?,now(),?,?);`;
        
        var arr = [
            req.body.proyectoId, 
            req.body.archivoContenido,
            req.body.archivoNombre,
            req.body.tipoArchivo,
            archivoSuperior
        ];
        bd.query(sql,arr,res);

    })
    .put(function(req, res){
        var sql = `update archivo set ArchivoNombre = ?, 
        ArchivoContenido = ?, ArchivoFecha = now(), 
        ArchivoSuperiorId = ? where ArchivoId = ?;`;
        var arr = [req.query.archivoNombre, req.query.archivoContenido, req.query.archivoSuperiorId, req.query.archivoId];
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

module.exports = router;