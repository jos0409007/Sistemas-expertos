var router = require("express").Router();
var bodyParser = require("body-parser");
var bd = require("./bd");


router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
    extended: true
  }));
  
//no es necesario hacer un put a las peticiones, ya que simplemente se debe eliminar los colaboradores.
router.route("/")
    .get(function(req, res){
        //debe ejecutarse al cargar el proyecto
        var sql = `select c.ColaboradorId, u.UsuarioNombre, u.UsuarioApellido, u.UsuarioNick, u.UsuarioCorreo from colaborador c 
        inner join usuario_plan up on c.ColaboradorId = up.UsuarioId
        inner join usuario u on up.UsuarioId = u.UsuarioId
        where c.ProyectoId = ?;`;

        var arr = [req.query.proyectoId];
        bd.query(sql,arr,res);
    })
    .post(function(req, res){
        var sql = "insert into colaborador(ProyectoId, ColaboradorId) values (?,?);";
        var arr = [req.body.proyectoId, req.body.colaboradorId];
        bd.query(sql,arr,res);
    })
    .delete(function(req, res){
        //ejecutarse en boton de eliminar colaborador en front end
        var sql = "call eliminar_colaborador(?,?);";
        var arr = [req.body.usuarioId, req.body.proyectoId];
        console.log(arr);
        bd.query(sql,arr,res);
    });

    router.get("/obtener-proyectos", function(req, res){
        var sql = "call proyect_colaborador(?)";
        var arr = [req.query.usuarioId];
        bd.query(sql,arr,res);
    });
module.exports = router;
//revisado