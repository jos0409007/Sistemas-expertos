//funcion para login de pagina index.
  $("#btn-login").click(function(){

    var correo = $("#log-usuario").val();
    var pass = $("#log-pass").val();
    $.ajax({
      url:"/login",
      data:`usuarioCorreo=${$("#log-usuario").val()}&usuarioNick=${$("#log-pass").val()}&usuarioPassword=${$("#log-pass").val()}`,
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

  $("#btn-registro").click(function(){

    var usuario = {
      nombre:$("#usr-nombre").val(),
      apellido:$("#usr-apellido").val(),
      nick:$("#usr-nick").val(),
      pass:$("#usr-pass").val(),
      correo:$("#usr-correo").val()
    };
    console.log($("#usr-pass").val());

    $.ajax({
      url:"/usuario",
      data:`usuarioNombre=${usuario.nombre}&usuarioApellido=${usuario.apellido}&usuarioNick=${usuario.nick}&usuarioPassword=${$("#usr-pass").val()}&usuarioCorreo=${usuario.correo}`,
      dataType:"json",
      method:"POST",
      success:function(res){
        console.log(res);
        if (res.affectedRows == 1){
          var id = res.insertId;
          $.ajax({
            url:"/plan-usuario",
            data:`usuarioId=${id}&planId=${$("#usr-plan").val()}`,
            dataType:"json",
            method:"POST",
            success:function(res){
              console.log(res);
              if (res.affectedRows == 1){
                alert("se ha registrado el usuario");
                $("#modalRegistro").modal("toggle");
              }
              else{
                alert("no se registro en plan");
              }
            },
            error:function(error){
              console.log(error);
            }
          });
        }
        else{
          alert("revisa tu informacion de registro");
        }
      },
      error:function(error){
        alert("aqui esta el error");
        console.log(error);
      }

    });


  });

  function registrarUsuario(){

    $.ajax({
      url:"/plan/all",
      dataType:"json",
      method:"GET",
      success:function(res){
          console.log(res);
          $("#usr-plan").empty();
          for(var i = 0; i< res.length; i++){
        
            $("#usr-plan").append(`
                <option value="${res[i].PlanId}" data-toggle="tooltip" title=${res[i].PlanDescripcion}>${res[i].PlanNombre}</option>
            `);
              
          } 
      },
      error:function(error){
          console.log(error);
      }
    
  });

  $("#modalRegistro").modal("show");

  }

  function cerrarSesion(){
    $.ajax({
      url:"/cerrar-sesion",
      dataType:"json",
      method:"GET",
      success:function(res){
        console.log(res);
        window.location = "/";
      },
      error:function(error){
        console.log(error);
      }
    });
  }

