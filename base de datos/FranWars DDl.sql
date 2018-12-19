create table if not exists plan
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

create table if not exists tipo_usuario
(
	TipoUsuarioId int auto_increment
		primary key,
	TipoUsuario varchar(40) null
)
;

create table if not exists usuario
(
	UsuarioId int auto_increment
		primary key,
	UsuarioNombre varchar(50) not null,
	UsuarioApellido varchar(50) not null,
	UsuarioNick varchar(20) not null,
	UsuarioPassword varchar(100) not null,
	UsuarioCorreo varchar(20) not null,
	UsuarioRedSocial varchar(100) null,
	TipoUsuarioId int null,
	UsuarioEstatus enum('Activo', 'Inactivo') not null,
	constraint Usuario_UsuarioNick_uindex
		unique (UsuarioNick),
	constraint usuario_tipo_fk
		foreign key (TipoUsuarioId) references tipo_usuario (TipoUsuarioId)
)
comment 'tabla de usuarios del sistema'
;

create table if not exists usuario_plan
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

create table if not exists proyecto
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

create table if not exists archivo
(
	ArchivoId int auto_increment
		primary key,
	ProyectoId int not null,
	ArchivoContenido varchar(3000) null,
	ArchivoNombre varchar(100) not null,
	ArchivoFecha datetime null,
	TipoArchivo varchar(40) null,
	ArchivoSuperiorId int null,
	constraint archivo_archivo_ArchivoId_fk
		foreign key (ArchivoSuperiorId) references archivo (ArchivoId)
			on update cascade on delete cascade,
	constraint archivo_proyecto_ProyectoId_fk
		foreign key (ProyectoId) references proyecto (ProyectoId)
			on update cascade on delete cascade
)
comment 'tabla de archivos de proyecto'
;

create table if not exists colaborador
(
	ColaboradorId int not null,
	ProyectoId int not null,
	primary key (ColaboradorId, ProyectoId),
	constraint colaborador_proyecto_ProyectoId_fk
		foreign key (ProyectoId) references proyecto (ProyectoId)
			on update cascade on delete cascade,
	constraint colaborador_usuario_plan_UsuarioId_fk
		foreign key (ColaboradorId) references usuario_plan (UsuarioId)
			on update cascade on delete cascade
)
;

create table if not exists chat
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

