var router = require("express").Router();
var bodyParser = require("body-parser");
var bd = require("./bd");


router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
    extended: true
  }));
  
//no es necesario un get debibo a que este ya se muestra en la seccion de usuario por el procedimiento almacenado
//tampoco es necesario eliminar un plan, ya que por usuario existe un unico registro, lo mejor es solo actualizar.
//cuando se elimine un usario, entonces si deberia de eliminar todos los registros. Se hara por procedimiento almacenado.

router.route("/")
    .post(function(req, res){
        var sql = "insert into usuario_plan(UsuarioId,PlanId,FechaContrato,FechaCaducidad) values (?,?,date(now()),null);";
        var arr = [req.body.usuarioId,req.body.planId];
        bd.query(sql,arr,res);
    })
    .put(function(req, res){
        var sql = `update usuario_plan set
        PlanId = ?,
        FechaContrato = date(now()),
        FechaCaducidad = null
        where UsuarioId = ?;`;
    
        var arr = [req.body.planId, req.body.usuarioId];
        bd.query(sql,arr,res);
    });

router.get("/obtener", function(req, res){
    var sql = `select a.UsuarioId, u.UsuarioNick, u.UsuarioCorreo, u.UsuarioNombre, u.UsuarioApellido from usuario_plan a 
    inner join usuario u on a.UsuarioId = u.UsuarioId
    where UsuarioCorreo = ? or UsuarioNick = ?;`;
    
    var arr = [req.query.usuarioTexto, req.query.usuarioTexto];
    bd.query(sql,arr,res);

});

module.exports = router;

//revisado