var router = require("express").Router();
var bodyParser = require("body-parser");
var bd = require("./bd");

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
    extended: true
  }));
  
//crud para los usuarios
router.route("/")
    .get(function(req, res){
        var sql = "call usr_plan(?)";
        var arr = [req.query.usuarioId];
        bd.query(sql,arr,res);
    })
    .post(function(req, res){
        var sql = `insert into 
        usuario(UsuarioNombre,UsuarioApellido,UsuarioNick,UsuarioPassword, UsuarioCorreo, UsuarioRedSocial, UsuarioEstatus) 
        values (?,?,?,?,?,?,?);`;

        var arr =  [
            req.body.usuarioNombre,
            req.body.usuarioApellido,
            req.body.usuarioNick,
            req.body.usuarioPassword,
            req.body.usuarioCorreo,
            req.body.usuarioRedSocial,
            req.body.usuarioEstatus
        ];

        bd.query(sql,arr,res);
    })
    .put(function(req, res){
        var sql = `update usuario set UsuarioNombre = ?, UsuarioApellido = ?, UsuarioNick = ?,
         UsuarioPassword = ?, UsuarioCorreo = ?, UsuarioEstatus = ? where UsuarioId = ?;`;

         var arr = [
             req.query.usuarioNombre,
             req.query.usuarioApellido,
             req.query.usuarioNick,
             req.query.usuarioPassword,
             req.query.usuarioCorreo,
             req.query.usuarioEstatus,
             req.query.usuarioId

         ];
         bd.query(sql,arr,res);
    })
    .delete(function(req, res){
        var sql = "call eliminar_usuario(?)";
        var arr = [req.query.usuarioId];
        bd.query(sql,arr,res);
    });

module.exports = router;

//revisado