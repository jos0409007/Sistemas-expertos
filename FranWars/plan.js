var router = require("express").Router();
var bodyParser = require("body-parser");
var bd = require("./bd");


router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
    extended: true
  }));
  
//no conviene eliminar un plan porque hay muchos registros que pueden depender de este registro, solo se dejara como inactivo
router.route("/")
    .get(function(req, res){
        var sql = "select PlanId, PlanNombre, PlanDescripcion, PlanEspacio, PlanEstatus from Plan where PlanId = ?";
        var arr = [req.query.planId];
        bd.query(sql,arr,res);
    })
    .post(function(req, res){

        var sql = "insert into plan(PlanNombre, PlanDescripcion, PlanEspacio, PlanEstatus) values (?,?,?,?)";
        var arr = [req.body.planNombre, req.body.planDescripcion, req.body.planEspacio, req.body.planEstatus];
        bd.query(sql,arr,res);
    })
    .put(function(req, res){
        var sql = "update plan set PlanNombre = ?, PlanDescripcion = ?, PlanEspacio = ?, PlanEstatus = ? where PlanId = ?;"
        var arr = [
            req.query.planNombre,
            req.query.planDescripcion,
            req.query.planEspacio,
            req.query.planEstatus,
            req.query.planId
        ];
        bd.query(sql,arr,res);
    });

    router.get("/all", function(req, res){
        var sql = "select PlanId, PlanNombre, PlanDescripcion, PlanEspacio, PlanEstatus from Plan";
        var arr = [];
        bd.query(sql,arr,res);
    });
module.exports = router;

//revisado