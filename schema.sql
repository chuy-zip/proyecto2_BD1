-- Create the tables
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
    rol VARCHAR(10) NOT NULL
);

CREATE TABLE IF NOT EXISTS mesero (
    id_user INTEGER NOT NULL,
    id_area_asignada NUMERIC(4) NOT NULL
);

CREATE TABLE IF NOT EXISTS area (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    fumadores BOOLEAN NOT NULL
);

CREATE TABLE IF NOT EXISTS mesa (
    id SERIAL PRIMARY KEY,
    capacidad NUMERIC(4) NOT NULL,
    movible BOOLEAN NOT NULL
);

CREATE TABLE IF NOT EXISTS posicion_mesas (
    id_mesa INTEGER NOT NULL,
    id_area INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS calificacion_mesero (
    id SERIAL PRIMARY KEY,
    id_mesero INTEGER NOT NULL,
    amabilidad NUMERIC(1) NOT NULL,
    exactitud NUMERIC(1) NOT NULL,
    fecha_hora TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    CONSTRAINT CHK_amabilidad_calificacion CHECK (amabilidad>=0 AND amabilidad<=5),
    CONSTRAINT CHK_exactitud_calificacion CHECK (exactitud>=0 AND exactitud<=5)
);

CREATE TABLE IF NOT EXISTS queja(
    id SERIAL PRIMARY KEY,
    fecha_hora TIMESTAMP WITH TIME ZONE DEFAULT NOW(), -- if there is not time and hour added in the entry, it takes the system timestamp
    motivo TEXT NOT NULL,
    severidad NUMERIC(1) NOT NULL,
    id_empleado INTEGER,
    id_producto INTEGER,
    CONSTRAINT CHK_severidad_calificacion CHECK (severidad>=0 AND severidad<=5)
);

CREATE TABLE IF NOT EXISTS producto (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(250) NOT NULL,
    descripcion TEXT,
    precio NUMERIC(10,2) NOT NULL,
	tipo INTEGER NOT NULL,
    CONSTRAINT CHK_precio CHECK (precio>=0.00)
);

CREATE TABLE IF NOT EXISTS tipo_producto(
	id_tipo SERIAL PRIMARY KEY,
	nombre VARCHAR(250)
);

CREATE TABLE IF NOT EXISTS orden (
    id SERIAL PRIMARY KEY,
    id_mesa INTEGER NOT NULL,
    estado VARCHAR(10) DEFAULT 'abierto' NOT NULL, -- abierto o cerrado
    fecha TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_DATE, -- yy-mm-dd format
    cantidad_comensales NUMERIC(4) DEFAULT 1
);

CREATE TABLE IF NOT EXISTS contenido_orden (
    id_orden INTEGER NOT NULL,
    cantidad_producto NUMERIC(4) NOT NULL,
    id_producto INTEGER NOT NULL,
    completado BOOLEAN DEFAULT FALSE NOT NULL, 
    tiempo TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS factura (
    id SERIAL PRIMARY KEY,
    nombre_cliente VARCHAR(250) NOT NULL,
    nit VARCHAR(15) NOT NULL,
    id_orden INTEGER NOT NULL,
    direccion TEXT,
    total NUMERIC(10,2) DEFAULT 0,
    fecha TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_DATE
);

CREATE TABLE IF NOT EXISTS pago_factura (
	id SERIAL PRIMARY KEY,
    id_factura INTEGER NOT NULL,
    forma_pago VARCHAR(25) NOT NULL,
    cantidad_pago NUMERIC(10,2) NOT NULL,
    CONSTRAINT CHK_cantidad_pago CHECK (cantidad_pago>=0.00)
);

-- Constraints for a table
ALTER TABLE mesero ADD CONSTRAINT fk_mesero_user_id FOREIGN KEY (id_user) REFERENCES users(id);
ALTER TABLE posicion_mesas ADD CONSTRAINT fk_mesa_en_area FOREIGN KEY (id_mesa) REFERENCES mesa(id);
ALTER TABLE posicion_mesas ADD CONSTRAINT fk_area_con_mesa FOREIGN KEY (id_area) REFERENCES area(id);
ALTER TABLE calificacion_mesero ADD CONSTRAINT fk_calificar_mesero FOREIGN KEY (id_mesero) REFERENCES users(id);
ALTER TABLE queja ADD CONSTRAINT fk_queja_empleado FOREIGN KEY (id_empleado) REFERENCES users(id);
ALTER TABLE queja ADD CONSTRAINT fk_queja_producto FOREIGN KEY (id_producto) REFERENCES producto(id);
ALTER TABLE orden ADD CONSTRAINT fk_mesa_en_orden FOREIGN KEY (id_mesa) REFERENCES mesa(id);
ALTER TABLE contenido_orden ADD CONSTRAINT fk_orden FOREIGN KEY (id_orden) REFERENCES orden(id);
ALTER TABLE contenido_orden ADD CONSTRAINT fk_producto_en_orden FOREIGN KEY (id_producto) REFERENCES producto(id);
ALTER TABLE factura ADD CONSTRAINT fk_orden_en_factura FOREIGN KEY (id_orden) REFERENCES orden(id);
ALTER TABLE pago_factura ADD CONSTRAINT fk_factura_pago_factura FOREIGN KEY (id_factura) REFERENCES factura(id);
ALTER TABLE producto ADD CONSTRAINT fk_id_tipo FOREIGN KEY (tipo) REFERENCES tipo_producto(id_tipo);

--Inserts
-- Insertar tipos de producto
INSERT INTO tipo_producto (nombre) VALUES
    ('Platillo'),
    ('Bebida');

-- Insertar usuarios
INSERT INTO users (username, password, rol) VALUES
    ('Juan', 'password1', 'Mesero'),
    ('Mario', 'password2', 'Mesero'),
    ('Mari', 'password3', 'Mesero'),
    ('Pedro', 'password343', 'Mesero'),
    ('Azucena', 'asdax2', 'Bartender'),
    ('Javier', 'password3786', 'Mesero'),
    ('Luisa', 'sdfasd', 'Chef'),
    ('Lucy', 'password111a', 'Mesero'),
    ('Roberto', 'password3aaaaaa', 'Chef');

-- Insertar áreas
INSERT INTO area (nombre, fumadores) VALUES
    ('area 1', true),
    ('area 2', false);

-- Insertar mesas
INSERT INTO mesa (capacidad, movible) VALUES
    (4, true),
    (6, false),
    (2, true),
    (8, true),
    (4, false),
    (10, true);


-- Insertar meseros
INSERT INTO mesero (id_user, id_area_asignada) VALUES
    (1, 1),
    (2, 2),
    (3, 1),
    (1, 2);

-- Insertar posiciones de mesas
INSERT INTO posicion_mesas (id_mesa, id_area) VALUES
    (1, 1),
    (2, 1),
    (3, 2);

-- Insertar productos
INSERT INTO producto (nombre, descripcion, precio, tipo) VALUES
    ('Pollo asado', 'Descripción del platillo 1', 10.99, 1),
    ('Jugo de Naranja', 'Descripción de la bebida 1', 5.99, 2),
    ('Ensalada César', 'Lechuga, pollo, crutones y aderezo cesar', 8.99, 1),
    ('Coca-Cola', 'Refresco de cola', 3.50, 2),
    ('Pizza Hawaiana', 'Pizza con piña y jamón', 12.50, 1);

-- Insertar órdenes no completas
INSERT INTO orden (id_mesa, estado, cantidad_comensales) VALUES
    (1, 'abierto', 2),
    (2, 'abierto', 2),
    (5, 'abierto', 3),
    (6, 'abierto', 5);
    

--Insertar ordenes completas
INSERT INTO orden (id_mesa, estado, fecha, cantidad_comensales) VALUES
    (3, 'cerrado', '2024-04-14 18:30:00', 4),
    (4, 'cerrado', '2024-04-15 20:15:00', 2);


-- Insertar contenido de órdenes
INSERT INTO contenido_orden (id_orden, cantidad_producto, id_producto, completado) VALUES
    (1, 2, 1, false),  -- Orden 1: 2 platillos 1
    (1, 3, 1, false),
    (1, 1, 2, false),  -- Orden 1: 1 bebida 1
    (2, 3, 1, false),  -- Orden 2: 3 platillos 1
    (5, 2, 1, false),  -- 2 platillos 1 (Pollo asado)
    (5, 1, 3, false),  -- 1 bebida 3 (Coca-Cola)
    (6, 3, 1, false),  -- 3 platillos 1 (Pollo asado)
    (6, 2, 4, false),  -- 2 bebidas 4 (Jugo de Naranja)
    (6, 1, 5, false);  -- 1 platillo 5 (Pizza Hawaiana)

-- Insertar facturas
--INSERT INTO factura (nombre_cliente, nit, id_orden) VALUES
    --('Cliente 1', '123456-7', 1),
    --('Cliente 2', '765432-1', 2);

-- Insertar pagos de facturas
--INSERT INTO pago_factura (id_factura, forma_pago, cantidad_pago) VALUES
    --(1, 1, 25.50),
    --(2, 2, 30.00);

-- Insertar calificaciones de meseros
INSERT INTO calificacion_mesero (id_mesero, amabilidad, exactitud) VALUES
    (1, 4, 5),
    (2, 3, 4),
    (3, 5, 4),
    (1, 3, 4),
    (2, 5, 5),
    (3, 4, 3);

insert into calificacion_mesero(id_mesero,amabilidad,exactitud, fecha_hora) values
	(1, 3, 4, '2023-10-25 00:00:00'),
	(2, 4, 5, '2023-11-25 00:00:00'),
    (1, 5, 4, '2023-10-25 00:00:00'),
	(1, 3, 5, '2023-09-25 00:00:00');

-- Insertar quejas
INSERT INTO queja (motivo, severidad, id_empleado, id_producto) VALUES
    ('Servicio lento', 3, 1, NULL),
    ('Producto defectuoso', 2, NULL, 2),
    ('Mesa sucia', 4, 3, NULL),
    ('Limpieza deficiente', 3, 1, NULL),
    ('Producto vencido', 4, NULL, 3),
    ('Mesa rota', 2, 2, NULL);

INSERT INTO queja(fecha_hora, motivo,severidad,id_empleado)VALUES 	
    ('2024-04-10 15:20:00', 'higiene', 4, 3),
    ('2024-04-10 15:00:00', 'trajo comida equivocada y luego lo puso en otra mesa', 3, 2),
    ('2024-04-14 10:20:00', 'Ruido excesivo', 2, 3),
    ('2024-04-15 11:00:00', 'Mal servicio', 3, 1);