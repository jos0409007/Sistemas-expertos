create procedure arch_proyect (IN ProyectoId int)
begin

select a.ArchivoId, a.ArchivoNombre, a.ArchivoContenido, a.ArchivoFecha,
a.ProyectoId, p.ProyectoNombre, a.TipoArchivo,
a.ArchivoSuperiorId, a2.ArchivoNombre as ArchivoSuperior
from archivo a
inner join proyecto p on a.ProyectoId = p.ProyectoId
left join archivo a2 on a.ArchivoSuperiorId = a2.ArchivoId
where a.ProyectoId = ProyectoId;

end
;

create procedure crear_proyecto (IN nombre varchar(50), IN descripcion varchar(200), IN id int)
begin
    insert into proyecto(ProyectoNombre, ProyectoDescripcion, UsuarioId)
    values (nombre, descripcion, id);

    set @id = (select max(proyectoId) from proyecto);

    insert into archivo(ProyectoId,ArchivoNombre,ArchivoContenido,ArchivoFecha, TipoArchivo, ArchivoSuperiorId)
    values (@id, nombre,null,now(),'Carpeta',null);
  
    set @id2 = (select  max(ArchivoId) from archivo);
    
    insert into archivo(ProyectoId,ArchivoNombre,ArchivoContenido,ArchivoFecha, TipoArchivo, ArchivoSuperiorId)
    values (@id, 'index.html',null,now(),'Archivo',@id2),
           (@id, 'controlador.js',null,now(),'Archivo',@id2),
           (@id, 'style.css',null,now(),'Archivo',@id2);

    insert into colaborador(ColaboradorId, ProyectoId) values (id, @id);
    select  @id as proyectoId;
  end
;

create procedure eliminar_colaborador (IN usuarioId int, IN proyectId int)
begin
    delete from chat where ColaboradorId = usuarioId and ProyectoId = proyectId;
    delete from colaborador where ColaboradorId = usuarioId and ProyectoId = proyectId;
  end
;

create procedure eliminar_proyecto (IN proyectId int)
begin
      delete from archivo where ProyectoId = proyectId;
      delete from chat where ProyectoId = proyectId;
      delete from colaborador where ProyectoId = proyectId;
      delete from proyecto where ProyectoId = proyectId;

end
;

create procedure eliminar_usuario (IN usrId int)
begin
      delete from chat where ColaboradorId = usrId;
      delete from colaborador where ColaboradorId = usrId;
      delete a from archivo a
      inner join proyecto b on a.proyectoId = b.ProyectoId
      where b.UsuarioId = usrId;
      delete from usuario_plan where UsuarioId = usrId;
      delete from usuario where UsuarioId = usrId;

end
;

create procedure pro_chat (IN ProyectoId int)
begin


select c.ChatId, c.ChatMensaje, c.ProyectoId,
p.ProyectoNombre, c.ColaboradorId, concat(u.UsuarioNombre, ' ', u.UsuarioApellido) as usuario, c.ChatFecha
from chat c
inner join colaborador c2
on c.ColaboradorId = c2.ColaboradorId and c.ProyectoId = c2.ProyectoId
inner join proyecto p on c2.ProyectoId = p.ProyectoId
inner join usuario_plan plan on c2.ColaboradorId = plan.UsuarioId
inner join usuario u on plan.UsuarioId = u.UsuarioId
order by c.ChatFecha asc;

end
;

create procedure proyect_col (IN ProyectoId int)
begin


select a.ProyectoId, p.ProyectoNombre,
plan.UsuarioId, concat(u.UsuarioNombre, ' ', u.UsuarioApellido) as usuario from colaborador a
inner join proyecto p on a.ProyectoId = p.ProyectoId
inner join usuario_plan plan on a.ColaboradorId = plan.UsuarioId
inner join usuario u on plan.UsuarioId = u.UsuarioId
where a.ProyectoId = ProyectoId;

end
;

create procedure proyect_colaborador (IN usuarioId int)
begin

    select a.ProyectoId, a.ProyectoNombre, a.ProyectoDescripcion, c.ColaboradorId from proyecto a
    inner join colaborador c on a.ProyectoId = c.ProyectoId
    where a.UsuarioId != usuarioId and c.ColaboradorId = usuarioId;

  end
;

create procedure usr_plan (IN UsuarioId int)
begin

select  a.UsuarioId, c.UsuarioNombre, c.UsuarioApellido, c.UsuarioCorreo, c.UsuarioNick, c.UsuarioPassword,
a.PlanId, b.PlanNombre, b.PlanDescripcion from franwars.usuario_plan a
inner join franwars.plan b
on (a.PlanId = b.PlanId)
inner join franwars.usuario c
on a.UsuarioId = c.UsuarioId
where a.UsuarioId = UsuarioId;
end
;

create procedure usr_proyecto (IN UsuarioId int)
begin

  select concat(u.UsuarioNombre, ' ', u.UsuarioApellido) as usuario,
  a.ProyectoId, a.ProyectoNombre, a.ProyectoDescripcion
  from proyecto a inner join usuario_plan b
  on a.UsuarioId = b.UsuarioId
  inner join usuario u on b.UsuarioId = u.UsuarioId
  where a.UsuarioId = UsuarioId;
end
;

