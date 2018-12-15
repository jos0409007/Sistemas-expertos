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
        usuario(UsuarioNombre,UsuarioApellido,UsuarioNick,UsuarioPassword, UsuarioCorreo, UsuarioRedSocial, TipoUsuarioId, UsuarioEstatus) 
        values (?,?,?,sha1(?),?,?,?,?);`;

        var arr =  [
            req.body.usuarioNombre,
            req.body.usuarioApellido,
            req.body.usuarioNick,
            req.body.usuarioPassword,
            req.body.usuarioCorreo,
            req.body.usuarioRedSocial,
            req.body.tipoUsuarioId,
            req.body.usuarioEstatus
        ];

        bd.query(sql,arr,res);
    })
    .put(function(req, res){
        console.log("estoy dentro del put");
        var sql = `update usuario set UsuarioNombre = ?, UsuarioApellido = ?, UsuarioNick = ?,
         UsuarioCorreo = ?, UsuarioEstatus = ? where UsuarioId = ?;`;
        console.log(req);

         var arr = [
             req.body.usuarioNombre,
             req.body.usuarioApellido,
             req.body.usuarioNick,
             req.body.usuarioCorreo,
             req.body.usuarioEstatus,
             req.body.usuarioId

         ];
         console.log(arr);
         bd.query(sql,arr,res);
    })
    .delete(function(req, res){
        var sql = "call eliminar_usuario(?)";
        var arr = [req.query.usuarioId];
        bd.query(sql,arr,res);
    });


router.put("/cambiar-pass", function(req, res){
    var sql = `update usuario set UsuarioPassword = sha1(?) where UsuarioId = ?;`;
    var arr = [
        req.query.usuarioPassword,
        req.query.usuarioId
    ];
    bd.query(sql,arr,res);

});

module.exports = router;

//revisado