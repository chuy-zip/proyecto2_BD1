-- Create the tables
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
    rol VARCHAR(10) NOT NULL
);

CREATE TABLE IF NOT EXISTS mesero (
    id_user NUMERIC(6) NOT NULL,
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
    id_mesa NUMERIC(6) NOT NULL,
    id_area NUMERIC(6) NOT NULL
);

CREATE TABLE IF NOT EXISTS calificacion_mesero (
    id SERIAL PRIMARY KEY,
    id_mesero NUMERIC(6) NOT NULL,
    amabilidad NUMERIC(1) NOT NULL,
    exactitud NUMERIC(1) NOT NULL,
    CONSTRAINT CHK_amabilidad_calificacion CHECK (amabilidad>=0 AND amabilidad<=5),
    CONSTRAINT CHK_exactitud_calificacion CHECK (exactitud>=0 AND exactitud<=5)
);

CREATE TABLE IF NOT EXISTS queja(
    id SERIAL PRIMARY KEY,
    fecha_hora TIMESTAMP DEFAULT NOW(), -- if there is not time and hour added in the entry, it takes the system timestamp
    motivo TEXT NOT NULL,
    severidad NUMERIC(1) NOT NULL,
    id_empleado NUMERIC(6) NOT NULL,
    id_platillo NUMERIC(6),
    CONSTRAINT CHK_severidad_calificacion CHECK (severidad>=0 AND severidad<=5)
);

CREATE TABLE IF NOT EXISTS platillo (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(250) NOT NULL,
    descripcion TEXT,
    precio NUMERIC(10,2) NOT NULL,
    CONSTRAINT CHK_precio CHECK (precio>=0.00)
);

CREATE TABLE IF NOT EXISTS orden (
    id SERIAL PRIMARY KEY,
    id_mesa NUMERIC(4) NOT NULL,
    estado VARCHAR(10) NOT NULL -- abierto o cerrado
);

CREATE TABLE IF NOT EXISTS contenido_orden (
    id_orden NUMERIC(6) NOT NULL,
    cantidad NUMERIC(4) NOT NULL,
    id_platillo NUMERIC(6) NOT NULL
);

CREATE TABLE IF NOT EXISTS factura (
    id SERIAL PRIMARY KEY,
    nombre_cliente VARCHAR(250) NOT NULL,
    nit VARCHAR(15) NOT NULL,
    id_orden NUMERIC(10) NOT NULL
);

CREATE TABLE IF NOT EXISTS pago_factura (
    id_factura NUMERIC(10) NOT NULL,
    forma_pago NUMERIC(3) NOT NULL,
    cantidad_pago NUMERIC(10,2) NOT NULL,
    CONSTRAINT CHK_cantidad_pago CHECK (cantidad_pago>=0.00)
);

CREATE TABLE IF NOT EXISTS pagos (
    id SERIAL NOT NULL,
    nombre VARCHAR(100)
);

-- Constraints for a table
ALTER TABLE mesero ADD CONSTRAINT fk_mesero_user_id FOREIGN KEY (id_user) REFERENCES user(id);
ALTER TABLE posicion_mesas ADD CONSTRAINT fk_mesa_en_area FOREIGN KEY (id_mesa) REFERENCES mesa(id);
ALTER TABLE posicion_mesas ADD CONSTRAINT fk_area_con_mesa FOREIGN KEY (id_area) REFERENCES area(id);
ALTER TABLE calificacion_mesero ADD CONSTRAINT fk_calificar_mesero FOREIGN KEY (id_mesero) REFERENCES user(id);
ALTER TABLE queja ADD CONSTRAINT fk_queja_empleado FOREIGN KEY (id_empleado) REFERENCES user(id);
ALTER TABLE queja ADD CONSTRAINT fk_queja_platillo FOREIGN KEY (id_platillo) REFERENCES platillo(id);
ALTER TABLE orden ADD CONSTRAINT fk_mesa_en_orden FOREIGN KEY (id_mesa) REFERENCES mesa(id);
ALTER TABLE contenido_orden ADD CONSTRAINT fk_orden FOREIGN KEY (id_orden) REFERENCES orden(id);
ALTER TABLE contenido_orden ADD CONSTRAINT fk_platillo_en_orden FOREIGN KEY (id_platillo) REFERENCES platillo(id);
ALTER TABLE factura ADD CONSTRAINT fk_orden_en_factura FOREIGN KEY (id_orden) REFERENCES orden(id);
ALTER TABLE pago_factura ADD CONSTRAINT fk_factura_a_pagar FOREIGN KEY (id_factura) REFERENCES factura(id);
ALTER TABLE pago_factura ADD CONSTRAINT fk_factura_forma_pagar FOREIGN KEY (forma_pago) REFERENCES pagos(id);



-- Insert initial data into the users table
INSERT INTO users (username, email, password) VALUES
('user1', 'user1@example.com', 'password123'),
('user2', 'user2@example.com', 'password456');
