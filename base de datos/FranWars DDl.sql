-- we don't know how to generate schema franwars (class Schema) :(
create table plan
(
	PlanId int auto_increment
		primary key,
	PlanNombre varchar(50) not null,
	PlanDescripcion varchar(200) not null,
	PlanEspacio int null,
	PlanEstatus enum('Activo', 'Inactivo') null
)
comment 'tabla de planes dentro del sistema'
;

create table tipo_archivo
(
	TipoArchivoId int auto_increment
		primary key,
	TipoArchivoNombre varchar(40) not null
)
;

create table usuario
(
	UsuarioId int auto_increment
		primary key,
	UsuarioNombre varchar(50) not null,
	UsuarioApellido varchar(50) not null,
	UsuarioNick varchar(20) not null,
	UsuarioCorreo varchar(20) not null,
	UsuarioRedSocial varchar(100) null,
	UsuarioEstatus enum('Activo', 'Inactivo') not null,
	constraint Usuario_UsuarioNick_uindex
		unique (UsuarioNick)
)
comment 'tabla de usuarios del sistema'
;

create table usuario_plan
(
	UsuarioId int not null
		primary key,
	PlanId int not null,
	FechaContrato date null,
	FechaCaducidad date null,
	constraint plan_usuario__fk
		foreign key (PlanId) references plan (PlanId)
			on update cascade on delete cascade,
	constraint usuario_plan_usuario_UsuarioId_fk
		foreign key (UsuarioId) references usuario (UsuarioId)
			on update cascade on delete cascade
)
;

create table proyecto
(
	ProyectoId int auto_increment
		primary key,
	ProyectoNombre varchar(50) not null,
	ProyectoDescripcion varchar(200) null,
	UsuarioId int not null,
	constraint usuario_proyecto_fk
		foreign key (UsuarioId) references usuario_plan (UsuarioId)
			on update cascade on delete cascade
)
comment 'tabla de proyectos '
;

create table archivo
(
	ArchivoId int auto_increment
		primary key,
	ProyectoId int not null,
	ArchivoContenido varchar(3000) null,
	ArchivoNombre varchar(20) not null,
	ArchivoFecha datetime null,
	TipoArchivoId int not null,
	ArchivoSuperiorId int null,
	constraint archivo_archivo_ArchivoId_fk
		foreign key (ArchivoSuperiorId) references archivo (ArchivoId)
			on update cascade on delete cascade,
	constraint archivo_proyecto_ProyectoId_fk
		foreign key (ProyectoId) references proyecto (ProyectoId)
			on update cascade on delete cascade,
	constraint archivo_tipo_archivo_TipoArchivoId_fk
		foreign key (TipoArchivoId) references tipo_archivo (TipoArchivoId)
			on update cascade on delete cascade
)
comment 'tabla de archivos de proyecto'
;

create table colaborador
(
	ColaboradorId int not null,
	ProyectoId int not null
		primary key,
	constraint colaborador_proyecto_ProyectoId_fk
		foreign key (ProyectoId) references proyecto (ProyectoId)
			on update cascade on delete cascade,
	constraint colaborador_usuario_plan_UsuarioId_fk
		foreign key (ColaboradorId) references usuario_plan (UsuarioId)
			on update cascade on delete cascade
)
;

create table chat
(
	ChatId int auto_increment
		primary key,
	ColaboradorId int not null,
	ProyectoId int not null,
	ChatMensaje varchar(4000) not null,
	ChatFecha datetime not null,
	constraint chat_colaborador_ColaboradorId_ProyectoId_fk
		foreign key (ColaboradorId, ProyectoId) references colaborador (ColaboradorId, ProyectoId)
			on update cascade on delete cascade
)
;

