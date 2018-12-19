function crearArchivo(){
    //alert("veamos si funciona");
    alert("este es el id: " + proyectoId + " " + proyectoNombre)
    $.ajax({
        url:"/archivo/carp",
        data:`proyectoId=${proyectoId}`,
        dataType:"json",
        method:"GET",
        success:function(res){
            if (res.length > 0){
                console.log(res[0]);
                $("#arch-superior").empty();
                $("#arch-superior").append(` 
                <option selected disabled>Selecciona la carpeta superior</option>
                <option value="">raiz</option>`);
                for(var i = 0; i< res.length; i++)
                    $("#arch-superior").append(`
                        <option value=${res[i].ArchivoId}>${res[i].ArchivoNombre}</option>
                    `);
            }
        },
        error:function(error){
            console.log(error);
        }
    });
    $("#modalNArchivo").modal("show");
}

$("#btn-archivo").click(function(){

    alert("hice click para guardar el archivo");
    console.log("estos son los valores de los campos");

  //  console.log($("#arch-nombre").val());
  //  console.log($("#arch-contenido").val());
    console.log("Tipo de archivo " + $("#arch-tipo").val());
  //  console.log($("#arch-superior").val());

    if($("#arch-nombre").val() ==  ""){
        alert("debe agregar un nombre.");
    }
    else{
        var contenido = null;
        var superior;


        if($("#arch-superior").val() == "" || $("#arch-superior").val() == null)
            superior = null;
        else
            superior = $("#arch-superior").val();
            
        $.ajax({
            url:"/archivo",
            data:`proyectoId=${proyectoId}&archivoContenido=${contenido}&archivoNombre=${$("#arch-nombre").val()}&tipoArchivo=${$("#arch-tipo").val()}&archivoSuperiorId=${superior}`,
            dataType:"json",
            method:"POST",
            success:function(res){
                if(res.affectedRows == 1){
                    alert("se ha creado el archivo");
                    cargarProyecto(proyectoId, proyectoNombre);
                    $("#modalNArchivo").modal("toggle");
                }
                else{
                    alert("algo ha sucedido");
                    console.log(res);
                }

            },
            error:function(error){
                console.log(error);
            }
        })
    }
    
    
});

function verificar(){
    console.log("este es mi editor html");
    console.log(editor2.getValue());
    console.log($("#html").data("value"));

    var res = document.getElementById('resultado').contentWindow.document;
    res.open();
    res.write(editor2.getValue());
    res.write("<style>" + editor3.getValue() + "</style>");
    res.write("<script>"+ editor.getValue() +"</script>");
    res.close();
}

function salvar(){

    var html = editor2.getValue();
    var css = editor3.getValue();
    var js = editor.getValue();
    var nombre;
    var contenido;
    var id;

    for (var i = 0; i < 3; i ++){
        if(i == 0){
            nombre = "index.html";
            contenido = html;
            id = $("#html").data("value")
        }else if(i==1){
            nombre = "style.css";
            contenido = css;
            id = $("#css").data("value")
        }else if(i == 2){
            nombre = "controlador.js";
            contenido = js;
           id = $("#editor").data("value")
        }

        $.ajax({
            url:"/archivo",
            data:`archivoNombre=${nombre}&archivoContenido=${contenido}&archivoId=${id}`,
            dataType:"json",
            method:"PUT",
            success:function(res){
                console.log(res);
            },
            error:function(error){
                console.log(error);
            }
        });

    }

}

function hola(){
    alert("funciona");
}