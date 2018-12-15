//funcion para login de pagina index.
  $("#btn-login").click(function(){

    $.ajax({
      url:"/login",
      data:`usuarioCorreo=${$("#log-usuario").val()}&usuarioNick=${$("#log-usuario").val()}&usuarioPassword=${$("#log-pass").val()}`,
      dataType:"json",
      method:"POST",
      success:function(res){
        //console.log("veamos si realmente funcinoa");
        console.log(res);
        if (res.length == 1){
          window.location = "/dashboard";
        }
        else{
          alert("usuario invalido");
        }
      },
      error:function(error){
        console.log(error);
      }
    });

  });