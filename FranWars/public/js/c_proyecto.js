
        
//propiedad que se utiliza para agregar y eliminar usuarios del proyecto
//proyectoId se carga en el boton de colaboradores de proyecto.
var proyectoId;
var proyectoNombre;
//funcion que obtiene todos los proyectos por un usuario
//tambien carga el menu para la busqueda de proyectos
$("#proyectos").click(function(){
  
    $("#div-menu").empty();
    $("#div-usuario").empty();
    $("#div-proyecto-col").empty();
    $("#div-menu").append(`
       
        <!--Card content-->
        <div class="card-body d-sm-flex justify-content-between">

            <h4 class="mb-2 mb-sm-0 pt-1">
                <span>Proyectos</span>
            </h4>

            <form class="d-flex justify-content-center">
                <!-- Default input -->
                <input type="search" placeholder="nombre de proyecto" aria-label="Search" class="form-control ml-0">
                <button type="button" class="btn mdb-color darken-4 btn-sm my-0 p">
                    <i class="fa fa-search"></i>
                </button>
                <button type="button" class="btn mdb-color darken-4 btn-sm my-0 p" onClick="crearProyecto();">
                    Nuevo Proyecto
                </button>

            </form>

        </div>

        <!-- Heading -->  `).children(':last').hide().fadeIn("3000");
        
    $("#div-proyecto").empty();
    //peticion donde se cargan los proyectos donde soy el admin de proyecto
    $.ajax({
        url:"/proyecto",
        data:`usuarioId=${usuarioId}`,
        dataType:"json",
        method:"GET",
        success:function(res){
           
            console.log(res[0]);
            for(var i = 0; i < res[0].length; i++){
                $("#div-proyecto").append(`
                <div class="col-xl-4 col-md-4 col-sm-12 col-xs-12 mb-4 my-2 pb-2 fadeIn">
 
                
                    <!-- Card Dark -->
                    <div class="card">
            
                        <!-- Card image -->
                        <div class="view overlay">
                        <img class="card-img-top" src="img/plan1.png" alt="Card image cap">
                        <a onClick="cargarProyecto(${res[0][i].ProyectoId},'${res[0][i].ProyectoNombre}');">
                            <div class="mask rgba-white-slight"></div>
                        </a>
                        </div>
                    
                        <!-- Card content -->
                        <div class="card-body elegant-color white-text rounded-bottom">
                    
                        <!-- Social shares button -->

                        <!-- Title -->
                        <a class="borrar" data-value=${res[0][i].ProyectoId} data-target="#modalConfirmDelete" data-toggle="modal"> <i class="fa fa-trash  m-2" aria-hidden="true"></i></a>
                         <a class="actualizar" data-value=${res[0][i].ProyectoId}
                          onClick="actualizarProyecto(${res[0][i].ProyectoId},'${res[0][i].ProyectoNombre.trimEnd()}','${res[0][i].ProyectoDescripcion.trimEnd()}');" ><i class="fa fa-pencil-square-o m-2" aria-hidden="true"></i></a>

                        <h4 class="card-title">${res[0][i].ProyectoNombre}</h4>

                        <hr class="hr-light">
                        <!-- Text -->
                        <p class="card-text white-text mb-3">${res[0][i].ProyectoDescripcion}.</p>
                        <!-- Link -->
                        <button class="btn mdb-color darken-4 white-text border-info mb-3 btn-lg btn-block "
                            name="btn-col" data-toggle="modal" data-target="#sideModalTLInfoDemo"
                            data-backdrop="false" value="${res[0][i].ProyectoId}" >colaboradores</button>
                        
                        </div>
                    
                    </div>
                    <!-- Card Dark -->
            
                 </div>
                


                `).children(':last').hide().fadeIn("3000");





            }
            
         
            
        },
        error:function(error){
            console.log(error);
        }
    });
    
    
    //peticion donde se cargan los proyectos en colaboracion
     $.ajax({
        url:"/colaborador/obtener-proyectos",
        data:`usuarioId=${usuarioId}`,
        dataType:"json",
        method:"GET",
        success:function(res){
            console.log(res);
            $("#div-proyecto-col").append("<div class='row col-12'><h1>Proyectos en colaboracion</h1></div><hr>");
           // console.log(res[0]);
            for(var i = 0; i < res[0].length; i++){
              
                $("#div-proyecto-col").append(`
                <div class="col-xl-4 col-md-4 col-sm-12 col-xs-12 mb-4 my-2 pb-2 fadeIn">
 
                
                    <!-- Card Dark -->
                    <div class="card">
            
                        <!-- Card image -->
                        <div class="view overlay">
                        <img class="card-img-top" src="img/plan2.jpg" alt="Card image cap">
                        <a onClick="cargarProyecto(${res[0][i].ProyectoId},'${res[0][i].ProyectoNombre}');">
                            <div class="mask rgba-white-slight"></div>
                        </a>
                        </div>
                    
                        <!-- Card content -->
                        <div class="card-body elegant-color white-text rounded-bottom">
                    
                        <!-- Social shares button -->

                        <!-- Title -->
                        <h4 class="card-title">${res[0][i].ProyectoNombre}</h4>

                        <hr class="hr-light">
                        <!-- Text -->
                        <p class="card-text white-text mb-3">${res[0][i].ProyectoDescripcion}.</p>
                        <!-- Link -->
                        <button class="btn mdb-color darken-4 white-text border-info mb-3 btn-lg btn-block "
                            name="btn-col" data-toggle="modal" data-target="#sideModalTLInfoDemo"
                            data-backdrop="false" value="${res[0][i].ProyectoId}" >colaboradores</button>
                        
                        </div>
                    
                    </div>
                    <!-- Card Dark -->
            
                 </div>
                


                `).children(':last').hide().fadeIn("3000");





            }
            
            
        },
        error:function(error){
            console.log(error);
        }
    });
    
    
});

//funcion que muestra todos los colaboradores de proyecto en los que soy admin
$("#div-proyecto").on("click", "button[name='btn-col']", function(){
    console.log("funciona desde el boton");
    var proyectId = $(this).val();
    $("#contenido-modal").empty();
    //activa controles en caso de ser adminsitrador
    $("#usCol").prop("disabled", false);
    $("#btn-eliminarCol").prop("disabled", false);
    obtenerColaboradores(proyectId);
  
});

//funcion que muestra todos los colaboradores de proyectos en los que estoy como colaborador
$("#div-proyecto-col").on("click", "button[name='btn-col']", function(){
    console.log("funciona el evento click de colaborador");
    var proyectId = $(this).val();
    $("#contenido-modal").empty();

    //deshabilita controles en caso de ser colaborador
    $("#usCol").prop("disabled", true);
    $("#btn-eliminarCol").prop("disabled", true);
    obtenerColaboradores(proyectId);
});

//mostrar informacion de usuarios del proyecto
$("#contenido-modal").on("click","a.infoCol",function(){
    console.log("funciona el boton de eliminar usuarios");
    console.log($(this).val());
    
    //al dar click sobre un item de la lista de colaboradores se carga en el objeto eliminar la informacion
    //del usuario y el id de proyecto, es mejor controlarlo desde aqui.

    eliminar.tipo = "eliminarUsuario";
    eliminar.id = $(this).data("value");

    $("#eliminar-mensaje").empty();
    $("#eliminar-mensaje").append(`<p>Eliminara a este colaborador del proyecto</p> 
    <i class="fa fa-times fa-4x animated rotateIn"></i>`);

   
    //console.log(eliminar);
});
//funcion que agrega un nuevo colaborador
$("#btn-agCol").click(function(){

    if ($("#usCol").val() == ""){
        console.log("no tiene informacion");
    }
    else{
        $.ajax({
            url:"plan-usuario/obtener",
            data:`usuarioTexto=${$("#usCol").val()}`,
            dataType:"json",
            method:"GET",
            success:function(res){
                console.log(res[0]);
                if (res.length == 1){
                    console.log("se encontro el usuario");
                    console.log(res[0].UsuarioId);
                    var usuario = res[0].UsuarioId;
                    var nick = res[0].UsuarioNick;
                    var correo = res[0].UsuarioCorreo;
                    var nombre = res[0].UsuarioNombre;
                    var apellido = res[0].UsuarioApellido

                    $.ajax({
                        url:"/colaborador",
                        data:`proyectoId=${proyectoId}&colaboradorId=${res[0].UsuarioId}`,
                        dataType:"json",
                        method:"post",
                        success:function(res){
                            console.log(res);
                            if (res.affectedRows && res.serverStatus == 2)
                                $("#listaCol").append(` <a class="infoCol" data-value=${usuario}  class="list-group-item list-group-item-action" 
                                onClick="informacion('${nombre.trimEnd()}', '${apellido.trimEnd()}', '${nick.trimEnd()}', '${correo.trimEnd()}');">
                                ${nick}</a>`);
                            else
                                console.log("este usuario ya esta en la lista");
                        },
                        error:function(error){
                            console.log(error);
                        }
                    });

                }
                else{
                    console.log("no se encontro");
                }
            },
            error:function(error){

            }
        });
    }

});

//lleva al promp de eliminar
//carga el id del colaborador y lo envia al modal
$("#btn-eliminarCol").click(function(){
    $("#modalConfirmDelete").modal("show");
});

//carga el id del proyecto y abre el modal para eliminar,
//recordar que el modal se comparte con eliminar un colaborador.

 $("#div-proyecto").on("click", "a.borrar", function(){
   // console.log("borrar funciona");
   // console.log($(this).data("value"));
    eliminar.tipo = "eliminarProyecto";
    eliminar.id = $(this).data("value");
    console.log(eliminar);
    $("#eliminar-mensaje").empty();
    $("#eliminar-mensaje").append(`<p>eliminara toda la informacion relacionada a este proyecto</p>
    <i class="fa fa-times fa-4x animated rotateIn"></i>`);
});



//eliminar colaborador, falta programar
$("#btn-eliminar").click(function(){
    if (eliminar.tipo == "eliminarUsuario"){
       // alert("esta eliminando un usuario");
       //console.log(cadena);
        $.ajax({
            url:"/colaborador",
            data:`usuarioId=${eliminar.id}&proyectoId=${proyectoId}`,
            dataType:"json",
            method:"DELETE",
            success:function(res){
                alert("Colaborador Eliminado");
                console.log(res);
                $("#modalConfirmDelete").modal("toggle");
                $("#modalRelatedContent").modal("toggle");

            },
            error:function(error){
                console.log(error);
            }
        });
    }  
    else if (eliminar.tipo == "eliminarProyecto"){
       $.ajax({
           url:"/proyecto",
           data:`proyectoId=${eliminar.id}`,
           dataType:"json",
           method:"DELETE",
           success:function(res){
                if(res.affectedRows == 1){
                    alert("Se ha eliminado el proyecto");
                }
           },
           error:function(error){
                console.log(error);
           }
       });
    }
        
});


//funcion que sirve tanto para crear como actualizar un proyecto
$("#btn-proyecto").click(function(){
    console.log("veamos desde el insert");
    console.log($("#pr-id").val());
   
    if($("#pr-id").val() == null || $("#pr-id").val() == "" || $("#pr-id").val() == undefined){
       
        if($("#pr-nombre").val() == "" || $("#pr-descripcion").val() == "")
            alert("debe llenar los campos requeridos");
        else{
            $.ajax({
                url:"/proyecto",
                data:`proyectoNombre=${$("#pr-nombre").val()}&proyectoDescripcion=${$("#pr-descripcion").val()}
                &usuarioId=${usuarioId}`,
                dataType:"json",
                method:"POST",
                success:function(res){
                    if(res[0].length > 0){
                        //respuesta que se obtiene desde el procedimiento almacenado
                        console.log(res);
                        console.log(res[0][0]);
                        var id = res[0][0].proyectoId;
                       
                        //carga el nuevo proyecto en la seccion de proyectos
                        $("#div-proyecto").append(`
                            <div class="col-xl-4 col-md-4 col-sm-12 col-xs-12 mb-4 my-2 pb-2 fadeIn">
            
                            
                                <!-- Card Dark -->
                                <div class="card">
                        
                                    <!-- Card image -->
                                    <div class="view overlay">
                                    <img class="card-img-top" src="img/plan1.png" alt="Card image cap">
                                    <a onClick="cargarProyecto(${res[0][i].ProyectoId},'${$("#pr-nombre").val()}');">
                                         <div class="mask rgba-white-slight"></div>
                                    </a>
                                    </div>
                                
                                    <!-- Card content -->
                                    <div class="card-body elegant-color white-text rounded-bottom">
                                
                                    <!-- Social shares button -->

                                    <!-- Title -->
                                    <a class="borrar" data-value=${id} data-target="#modalConfirmDelete" data-toggle="modal"> <i class="fa fa-trash  m-2" aria-hidden="true"></i></a>
                                    <a class="actualizar" data-value=${id}
                                    onClick="actualizarProyecto(${id},'${$("#pr-nombre").val().trimEnd()}','${$("#pr-descripcion").val().trimEnd()}');" ><i class="fa fa-pencil-square-o m-2" aria-hidden="true"></i></a>

                                    <h4 class="card-title">${$("#pr-nombre").val()}</h4>

                                    <hr class="hr-light">
                                    <!-- Text -->
                                    <p class="card-text white-text mb-3">${$("#pr-descripcion").val()}.</p>
                                    <!-- Link -->
                                    <button class="btn mdb-color darken-4 white-text border-info mb-3 btn-lg btn-block "
                                        name="btn-col" data-toggle="modal" data-target="#sideModalTLInfoDemo"
                                        data-backdrop="false" value="${id}" >colaboradores</button>
                                    
                                    </div>
                                
                                </div>
                                <!-- Card Dark -->
                        
                            </div>
                            
                            `).children(':last').hide().fadeIn("3000");
                            alert("se agrego un nuevo proyecto");
                            $("#modalProyecto").modal("toggle");
                    }
                   
                    
                },
                error:function(error){
                    alert(error);
                }
            });
        }

    }else{
   
       $.ajax({
        url:"/proyecto",
        data:`proyectoNombre=${$("#pr-nombre").val()}&proyectoDescripcion=${$("#pr-descripcion").val()}
        &proyectoId=${$("#pr-id").val()}`,
        dataType:"json",
        method:"PUT",
        success:function(res){
            if(res.affectedRows == 1){
                console.log(res);
                alert("se ha actualizado el registro");
                $("#modalProyecto").modal("toggle");
            }else{
                alert("algo ha sucedido");
                console.log(res);
            }
        },
        error:function(error){
            console.log(error);
        }
       });
    }

});
//data-target="#modalConfirmDelete" data-toggle="modal"

//funcion que generaliza los botones para
//recordar el orden.
//obtiene proyectos, ve colaboradores, seleccionar colaborador(ver info y posible eliminar), eliminar de proyecto
function obtenerColaboradores(proyectId){
    $.ajax({
        url:"/colaborador",
        data:`proyectoId=${proyectId}`,
        dataType:"json",
        method:"GET",
        success:function(res){
            console.log(res);
            $("#contenido-modal").append(`<div class="list-group" id="listaCol">`);
            for(var i = 0; i < res.length; i++){
                $("#listaCol").append(`
                <a class="infoCol" data-value=${res[i].ColaboradorId}  class="list-group-item list-group-item-action" 
                onClick="informacion('${res[i].UsuarioNombre.trimEnd()}', '${res[i].UsuarioApellido.trimEnd()}', '${res[i].UsuarioNick.trimEnd()}', '${res[i].UsuarioCorreo.trimEnd()}');">
                ${res[i].UsuarioNick}</a>
            `);
            }
            $("#contenido-modal").append(`</ul>`);
            //al obtener todos los colaboradores de proyecto, se carga en variable el id del proyecto que seleccione.
            //se hace para tener un mejor control del proyecto.
            
            proyectoId = $("button[name='btn-col']").val();
        },
        error:function(error){
            console.log(error);
        }
    });
}

//funcion que sirve para cargar en modal la informacion del usuario para luego hacer una actualizacion.
function actualizarProyecto(id, nombre, descripcion){
    //console.log("funciona desde el metodo actualizar " + id);
    console.log(nombre);
    console.log(descripcion);
    $("#pr-info").empty();
    $("#pr-info").append(`
    <div class="md-form ml-0 mr-0">
        <input  type="text" id="pr-id" class="form-control ml-0" value=${id} disabled >
        <label for="pr-id" class="ml-0 active">Id</label>
    </div>
    <div class="md-form ml-0 mr-0">
        <input  type="text" id="pr-nombre" class="form-control ml-0" value='${nombre}' selected>
        <label for="pr-nombre" class="ml-0 active">Nombre</label>
    </div>
    
    <div class="md-form ml-0 mr-0">
        <input  type="text" id="pr-descripcion" class="form-control ml-0" value='${descripcion}'>
        <label for="pr-descripcion" class="ml-0 active">Descripcion</label>
    </div>
                          
    
    `);
    $("#modalProyecto").modal("show");
}

//funcion que sirve para desplegar en modal la informacion del colaborador
function informacion(usuarioNombre, usuarioApellido, usuarioNick, usuarioCorreo){
    
   $("#info-usuario").empty();
    $("#info-usuario").append(`
        <p><strong>${usuarioNick}</strong></p>
        <p>${usuarioNombre} ${usuarioApellido}</p>
        <p>${usuarioCorreo}</p>
    `);
    $("#modalRelatedContent").modal("show");
}
//funcion para cargar dinamicamente los campos necesarios para crear un nuevo proyecto en modal.
function crearProyecto(){
    $("#pr-info").empty();
    $("#pr-info").append(`
    <div class="md-form ml-0 mr-0">
        <input  type="text" id="pr-id" class="form-control ml-0" disabled >
        <label for="pr-id" class="ml-0 ">Id</label>
    </div>
    <div class="md-form ml-0 mr-0">
        <input  type="text" id="pr-nombre" class="form-control ml-0">
        <label for="pr-nombre" class="ml-0 ">Nombre</label>
    </div>
    
    <div class="md-form ml-0 mr-0">
        <input  type="text" id="pr-descripcion" class="form-control ml-0" >
        <label for="pr-descripcion" class="ml-0 ">Descripcion</label>
    </div>
                          
    
    `);
    $("#modalProyecto").modal("show");
}

//funcion para cargar el proyecto en el modal.
function cargarProyecto(proyectId,proyectNombre){
    $("#proyectoTitulo").empty();
    $("#proyectoTitulo").html("prNombre");

    editor = null;
    editor2 = null;
    editor3 = null;
    //myCode=editor.getSession().getValue();
    $("#div-ace").empty();


    $.ajax({
        url:"/archivo/carpetas",
        data:`proyectoId=${proyectId}`,
        dataType:"json",
        method:"GET",
        success:function(res){
            console.log("Desde el metodo");
            console.log(res);
            $("#listaProyecto").empty();
            if (res.length > 0){
               
                var clase = "lista";
                var cadena = `<div>
                                <p>${proyectNombre}</p>
                                <ul class=${clase}>`;
                $("#listaProyecto").append(cadena);
                for(var i = 0; i < res.length; i++){
                    dependencia(proyectId,res[i].ArchivoId, res[i].ArchivoNombre, res[i].TipoArchivo,clase,res[i].ArchivoContenido);
                }
                
                var c2 = `</ul></div>`;
                $("#listaProyecto").append(c2);
            }


        },
        error:function(error){
            console.log(error);
        }
    });

  
    proyectoId = proyectId;
    proyectoNombre = proyectNombre;
    $("#modalArchivos").modal("show");
}

//funcion recursiva, se llama para crear el arbol de archivos dentro del proyecto.
function dependencia(PrId, archId, archNombre, tipo,clase, contenido){

   // alert(`veamos que esta pasando: ${PrId}, ${archId}, ${archNombre}, ${tipo}, ${clase}, ${contenido}`);

    if(tipo =="Carpeta"){
        var clas = archNombre.replace(" ",'-');
    var cadena = `<i class="fa fa-folder-open" aria-hidden="true">${archNombre}<ul class=${clas}>`;
        console.log(PrId,archId);
        $(`.${clase}`).append(cadena);
        $.ajax({
            url:"archivo/archivos",
            data:`proyectoId=${PrId}&superiorId=${archId}`,
            dataType:"json",
            method:"GET",
            success:function(res){
                if(res.length > 0){
                  //  alert(res);
                 //   console.log(res);
                    for(var i = 0; i< res.length; i++){
                  //      console.log(PrId + " " + res[i].ArchivoId + " " + res[i].ArchivoNombre + " " + res[i].TipoArchivo + " " + clas + " " + res[i].contenido);
                        dependencia( PrId,res[i].ArchivoId,res[i].ArchivoNombre, res[i].TipoArchivo,clas,res[i].ArchivoContenido);
                    }
                }
                var c2 = `</ul></li>`;
                $(`.${clas}`).append(c2);
            },
            error:function(error){
                console.log(error);
            }
        });
    }
    else if(tipo=="Archivo"){
      //  alert("encontro: " + archNombre + " " + archId);
        var c = `<i class="fa fa-file-code-o mb-1" aria-hidden="true" ><a onClick="mensaje();">${archNombre}</a></i>`;
        $(`.${clase}`).append(c);
        
        if(archNombre.trimEnd() == "index.html"){

            $("#div-ace").append(`
            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12">
                <h2>html</h2>
                <pre id="html" class="editor" data-value="${archId}"></pre>
            </div>
            
            `);

            editor2 = ace.edit("html", {
                theme: "ace/theme/tomorrow_night_eighties",
                mode: "ace/mode/html",
                wrap: true,
                autoScrollEditorIntoView: true
            });
            if (contenido == null || contenido == undefined || contenido == "")
                editor2.setValue("<!--Escribe tu estructura-->");
            else 
                editor2.setValue(contenido);

            editor2.setOptions({
                enableBasicAutocompletion: true,
                enableSnippets: true,
                enableLiveAutocompletion: true
            });

        }else if(archNombre.trimEnd() == "style.css"){

            $("#div-ace").append(`
            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12">
                <h2>CSS</h2>
                <pre id="css" class="editor" data-value=${archId}></pre>
            </div>
            `);

            editor3 = ace.edit("css", {
                theme: "ace/theme/tomorrow_night_eighties",
                mode: "ace/mode/css",
                wrap: true,
                autoScrollEditorIntoView: true
            });
            
            editor3.setOptions({
                enableBasicAutocompletion: true,
                enableSnippets: true,
                enableLiveAutocompletion: true
            });

            if (contenido == undefined || contenido == null || contenido == "")
                editor3.setValue("/*escribe tu codigo*/");
            else
                editor3.setValue(contenido);

          
        }
        else if(archNombre.trimEnd() == "controlador.js"){

            $("#div-ace").append(`
            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12">
                <h2>JS</h2>
                <pre id="editor" class="editor" data-value=${archId} >//editor js</pre>
            </div>
            
            `);

            editor = ace.edit("editor");
            editor.setTheme("ace/theme/dracula");
            editor.session.setMode("ace/mode/javascript");
            editor.setOption("ennableEmmet", true);
            editor.setValue("");
            if (contenido == undefined || contenido == null || contenido == "")
                editor.setValue("/*escribe tu codigo*/");
            else
                editor.setValue(contenido);

            
    
        }
    }
    
}

function mensaje(){
    alert("funciona");
}
