//funcion que carga la informacion de usaurio en dashboard al dar click sobre el boton informacion usuario.
$("#btn-informacion").click(function(){
    $("#div-menu").empty();
    $("#div-proyecto").empty();
    $("#div-proyecto-col").empty();
    $("#div-usuario").empty();
    $.ajax({
        url:"/usuario",
        data:`usuarioId=${usuarioId}`,
        dataType:"json",
        method:"GET",
        success:function(res){
            console.log(res[0]);
            
            if (res[0].length == 1){

                for (var i =0; i< res[0].length; i++){


                $("#div-usuario").append(`
                
                <div class="col-lg-6 col-md-6 mb-4">

                    <!--Card-->
                    <div class="card">

                        <!-- Card header  USUARIO-->
                        <div class="card-header">Usuario Informacion</div>

                        <!--Card content-->
                        <div class="card-body">
                            <div class="md-form ml-0 mr-0">
                                <input  type="text" id="usr-id" class="form-control ml-0" value=${res[0][i].UsuarioId} disabled >
                                <label for="usr-id" class="ml-0 active">Id</label>
                            </div>
                            <div class="md-form ml-0 mr-0">
                                <input  type="text" id="usr-nombre" class="form-control ml-0" value='${res[0][i].UsuarioNombre}' selected>
                                <label for="usr-nombre" class="ml-0 active">Nombre</label>
                            </div>
                            
                            <div class="md-form ml-0 mr-0">
                                <input  type="text" id="usr-apellido" class="form-control ml-0" value='${res[0][i].UsuarioApellido}'>
                                <label for="usr-apellido" class="ml-0 active">Apellido</label>
                            </div>
                            
                            <div class="md-form ml-0 mr-0">
                                <input  type="text" id="usr-nick" class="form-control ml-0" value='${res[0][i].UsuarioNick}'>
                                <label for="usr-nick" class="ml-0 active">Nick</label>
                            </div>
                            
                            <div class="md-form ml-0 mr-0">
                                <input  type="text" id="usr-correo" class="form-control ml-0" value='${res[0][i].UsuarioCorreo}'>
                                <label for="usr-correo" class="ml-0 active">Correo</label>
                            </div>
                            
                            <button class="btn mdb-color darken-4 white-text border-info mb-3 btn-lg btn-block " id="usr-actualizar"
                            data-backdrop="false" >actualizar</button>
                        </div>

                    </div>
                    <!--/.Card-->

                    </div>

                    <div class="col-lg-6 col-md-6 mb-4">

                        <!--Card-->
                        <div class="card">

                            <!-- Card header -->
                            <div class="card-header">Plan</div>

                            <!--Card content-->
                            <div class="card-body">
                                <div class="md-form ml-0 mr-0">
                                    <select name="select" id="usr-plan" class="form-control ml-0">
                                        
                                    </select>
                                </div>
                                <div class="md-form ml-0 mr-0" id="contenido-plan">
                                    <h5 id="pl-cont">veamos</h5>
                                    <p id="pl-tam"></p>
                                </div>
                                <button id ="btn-actPlan" class="btn mdb-color darken-4 white-text border-info mb-3 btn-lg btn-block "
                                data-backdrop="false" >actualizar</button>
                            </div>



                        </div>
                        <!--/.Card-->

                        </div>

                `).children(':last').hide().fadeIn("3000");
                

                var planId = res[0][i].PlanId;
                    //carga todos los planes disponibles y agrega los demas planes disponibles.
                    //deja como seleccionado el plan al cual esta suscrito.
                $.ajax({
                    url:"/plan/all",
                    dataType:"json",
                    method:"GET",
                    success:function(res){
                        console.log(res);
                        for(var i = 0; i< res.length; i++){
                            if (res[i].PlanId == planId ){
                                console.log("funciona");
                                $("#usr-plan").append(`
                                <option value="${res[i].PlanId}" selected data-toggle="tooltip" 
                                title=${res[i].PlanDescripcion}>${res[i].PlanNombre}</option>`);
                                
                                $("#pl-cont").text("Descripcion: " + res[i].PlanDescripcion);
                                $("#pl-tam").text("Cantidad Proyectos: " + res[i].PlanEspacio);
                            }
                            else{
                                $("#usr-plan").append(`
                                    <option value="${res[i].PlanId}" data-toggle="tooltip" title=${res[i].PlanDescripcion}>${res[i].PlanNombre}</option>
                                `);
                            }
                        } 
                    },
                    error:function(error){
                        console.log(error);
                    }
                });


                }
            }
        },
        error:function(error){
            console.log(error);
        }
    });
});

//funcion para cambiar la informacion del plan
$("#div-usuario").on("click","#usr-plan",function(){
    console.log($("#usr-plan").val());

    $.ajax({
        url:"/plan",
        data:`planId=${$("#usr-plan").val()}`,
        dataType:"json",
        method:"GET",
        success:function(res){
            if (res.length == 1){
                console.log(res[0]);
                $("#pl-cont").text("Descripcion: " + res[0].PlanDescripcion);
                $("#pl-tam").text("Cantidad Proyectos: " + res[0].PlanEspacio);
            }
        },
        error:function(error){
            console.log(error);
        }
    });

});

//funcion para actualizar el plan del usuario
$("#div-usuario").on("click","#btn-actPlan", function(){
    console.log("he dado click a actualizar");
    
    $.ajax({
        url:"plan-usuario",
        data:`planId=${$("#usr-plan").val()}&usuarioId=${$("#usr-id").val()}`,
        dataType:"json",
        method:"PUT",
        success:function(res){
            console.log(res);
        },
        error:function(error){
            console.log(error);
        }
    });

});

//funcion para actualizar la tabla de usuario.
$("#div-usuario").on("click", '#usr-actualizar', function(){
    var estatus="Activo";
    console.log(`usuarioNombre=${$("#usr-nombre").val()}&usuarioApellido=${$("#usr-apellido").val()}
        &usuarioNick=${$("#usr-nick").val()}&usuarioCorreo=${$("#usr-correo").val()}&usuarioEstatus=${estatus}
        &usuarioId=${$("#usr-id").val()}`);
    
    $.ajax({
        url:"/usuario",
        data:`usuarioNombre=${$("#usr-nombre").val()}&usuarioApellido=${$("#usr-apellido").val()}
        &usuarioNick=${$("#usr-nick").val()}&usuarioCorreo=${$("#usr-correo").val()}&usuarioEstatus=${estatus}
        &usuarioId=${$("#usr-id").val()}`,
        dataType:"json",
        method:"PUT",
        success:function(res){
            console.log(res);
            
        },
        error:function(error){
            console.log(error);
        }
    });
});



