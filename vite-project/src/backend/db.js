import { text } from "express";
import getClient from "./postgreConn.js"

const client = getClient();

export async function getUsers() {
    try {
        const query = {
            text: 'SELECT * FROM users'
        }

        const result = await client.query(query)
        return result.rows;
        
    } catch (error) {
        console.error('Error getting users', error)
        throw error
    }
}

//para registrar nuevo usario
export async function registerUser(username, password, rol) {
    try {
        const query = {
            text: 'INSERT INTO users (username, password, rol) VALUES ($1, $2, $3)',
            values: [username, password, rol]
        }
    
        const result = await client.query(query)
    
        return result.rowCount === 1;
    } catch (error) {
        console.error('Error registering users', error)
        throw error
    }
}

//verifica que un usuario exista
export async function verifyUser(username, password) {
    try {
        const query = {
            text: 'SELECT * FROM users WHERE username = $1 AND password = $2',
            values: [username, password]
        }
    
        const result = await client.query(query);
    
        // Si hay filas devueltas, el usuario existe
        if (result.rows.length > 0) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.error('Error verifying users', error);
        throw error;
    }
}

//delete user

//informacion de usario en especifico
export async function getUserById(id){
    try {
        const query = {
            text: 'SELECT * FROM users WHERE id = $1',
            values: [id]
        }
        const result = await client.query(query)
        return result.rows

    } catch (error) {
        console.error('Error getting users', error)
        throw error
    }
}

// asigna un mesero a un area
export async function assignWaiterToArea(idUser, idArea) {
    try {
        const query = {
            text: 'INSERT INTO mesero (id_user, id_area_asignada) VALUES ($1, $2)',
            values: [idUser, idArea]
        };
    
        const result = await client.query(query);
    
        return result.rowCount === 1; // Devuelve true si se insertó correctamente
    } catch (error) {
        console.error('Error assigning waiter to area', error);
        throw error;
    }
}

// todas las areas de un mesero
export async function getAreasForWaiter(userId) {
    try {
        const query = {
            text: 'SELECT area.* FROM area JOIN mesero ON area.id = mesero.id_area_asignada WHERE mesero.id_user = $1',
            values: [userId]
        };
    
        const result = await client.query(query);
    
        return result.rows;
    } catch (error) {
        console.error('Error getting areas for waiter', error);
        throw error;
    }
}

// eliminacionde un mesero de un area
export async function removeWaiterFromArea(userId, areaId) {
    try {
        const query = {
            text: 'DELETE FROM mesero WHERE id_user = $1 AND id_area_asignada = $2',
            values: [userId, areaId]
        };
    
        const result = await client.query(query);
    
        // Return true if a row was deleted
        return result.rowCount === 1;
    } catch (error) {
        console.error('Error removing waiter from area', error);
        throw error;
    }
}
  
// listar las areas
export async function listAllAreas() {
    try {
        const query = {
            text: 'SELECT * FROM area'
        };
    
        const result = await client.query(query);
    
        return result.rows;
    } catch (error) {
        console.error('Error listing all areas', error);
        throw error;
    }
}

// crear nueva area
export async function createArea(nombre, fumadores) {
    try {
        const query = {
            text: 'INSERT INTO area (nombre, fumadores) VALUES ($1, $2)',
            values: [nombre, fumadores]
        };
    
        const result = await client.query(query);
    
        return result.rowCount === 1;
    } catch (error) {
        console.error('Error creating area', error);
        throw error;
    }
}
  
// eliminar area
export async function deleteArea(areaId) {
    try {
        const query = {
        text: 'DELETE FROM area WHERE id = $1',
        values: [areaId]
        };
  
        const result = await client.query(query);
  
        return result.rowCount === 1;
    } catch (error) {
        console.error('Error deleting area', error);
        throw error;
    }
}

// listar todas las mesas
export async function listAllTables() {
    try {
        const query = {
        text: 'SELECT * FROM mesa'
        };

        const result = await client.query(query);

        return result.rows;
    } catch (error) {
        console.error('Error listing all tables', error);
        throw error;
    }
}

//crear nueva mesa
export async function createTable(capacidad, movible) {
    try {
        const query = {
            text: 'INSERT INTO mesa (capacidad, movible) VALUES ($1, $2)',
            values: [capacidad, movible]
        };
        const result = await client.query(query);
    
        return result.rowCount === 1;
    } catch (error) {
      console.error('Error creating table', error);
      throw error;
    }
}

// eliminar mesa
export async function deleteTable(tableId) {
    try {
        const query = {
            text: 'DELETE FROM mesa WHERE id = $1',
            values: [tableId]
        };
        const result = await client.query(query);
    
        return result.rowCount === 1;
    } catch (error) {
        console.error('Error deleting table', error);
        throw error;
    }
}

// asignar mesa a un area
export async function assignTableToArea(tableId, areaId) {
    try {
        const query = {
            text: 'UPDATE mesa SET id_area_asignada = $1 WHERE id = $2',
            values: [areaId, tableId]
        };
        const result = await client.query(query);
    
        return result.rowCount === 1;
    } catch (error) {
        console.error('Error assigning table to area', error);
        throw error;
    }
}

//eliminar mesa de un area
export async function removeTableFromArea(tableId) {
    try {
        const query = {
            text: 'UPDATE mesa SET id_area_asignada = NULL WHERE id = $1',
            values: [tableId]
        };
    
        const result = await client.query(query);
    
        return result.rowCount === 1;
    } catch (error) {
        console.error('Error removing table from area', error);
        throw error;
    }
}

// listar todas las mesas de un area
export async function listTablesInArea(areaId) {
    try {
        const query = {
            text: 'SELECT * FROM mesa WHERE id_area_asignada = $1',
            values: [areaId]
        };
        const result = await client.query(query);
    
        return result.rows;
    } catch (error) {
        console.error('Error listing tables in area', error);
        throw error;
    }
}

// calificar mesero
export async function addRatingToWaiter(waiterId, amabilidad, exactitud) {
    try {
        const query = {
            text: 'INSERT INTO calificacion_mesero (id_mesero, amabilidad, exactitud) VALUES ($1, $2, $3)',
            values: [waiterId, amabilidad, exactitud]
        };
        const result = await client.query(query);
    
        return result.rowCount === 1;
    } catch (error) {
        console.error('Error adding rating to waiter', error);
        throw error;
    }
}

// queja
// Función para agregar una queja de un empleado
export async function addEmployeeComplaint(employeeId, motivo, severidad) {
    try {
        const query = {
            text: 'INSERT INTO queja (motivo, severidad, id_empleado) VALUES ($1, $2, $3)',
            values: [motivo, severidad, employeeId]
        };
        const result = await client.query(query);
        return result.rowCount === 1;
    } catch (error) {
        console.error('Error adding employee complaint', error);
        throw error;
    }
}

// Función para agregar una queja de un plato
export async function addDishComplaint(dishId, motivo, severidad) {
    try {
        const query = {
            text: 'INSERT INTO queja (motivo, severidad, id_producto) VALUES ($1, $2, $3)',
            values: [motivo, severidad, dishId]
        };
        const result = await client.query(query);
        return result.rowCount === 1;
    } catch (error) {
        console.error('Error adding dish complaint', error);
        throw error;
    }
}

// listar las quejas
export async function getComplaints() {
    try {
        const query = {
            text: 'SELECT * FROM queja'
        }

        const result = await client.query(query)
        return result.rows;
        
    } catch (error) {
        console.error('Error getting users', error)
        throw error
    }
}

// agregar producto
export async function addProduct(nombre, descripcion, precio, tipo) {
    try {
        const query = {
            text: 'INSERT INTO producto (nombre, descripcion, precio, tipo) VALUES ($1, $2, $3, $4)',
            values: [nombre, descripcion, precio, tipo]
        };
        const result = await client.query(query);
    
        return result.rowCount === 1;
    } catch (error) {
        console.error('Error adding product', error);
        throw error;
    }
}

// eliminar producto
export async function deleteProduct(productId) {
    try {
      const query = {
        text: 'DELETE FROM producto WHERE id = $1',
        values: [productId]
      };
      const result = await client.query(query);
  
      return result.rowCount === 1;
    } catch (error) {
      console.error('Error deleting product', error);
      throw error;
    }
}

// listar todos los productos
export async function listAllProducts() {
    try {
        const query = {
            text: 'SELECT * FROM producto'
        };
        const result = await client.query(query);
    
        return result.rows;
    } catch (error) {
        console.error('Error listing all products', error);
        throw error;
    }
}

//TIPO
// agregar tipo
export async function addProductType(nombreTipo) {
    try {
        const query = {
            text: 'INSERT INTO tipo_producto (nombre) VALUES ($1)',
            values: [nombreTipo]
        };
        const result = await client.query(query);
    
        return result.rowCount === 1;
    } catch (error) {
        console.error('Error adding product type', error);
        throw error;
    }
}

// eliminar tipo
export async function deleteProductType(typeId) {
    try {
        const query = {
            text: 'DELETE FROM tipo_producto WHERE id_tipo = $1',
            values: [typeId]
        };
        const result = await client.query(query);
    
        return result.rowCount === 1;
    } catch (error) {
        console.error('Error deleting product type', error);
        throw error;
    }
}

// listar todos los tipos
export async function listAllProductTypes() {
    try {
        const query = {
            text: 'SELECT * FROM tipo_producto'
        };
        const result = await client.query(query);
    
        return result.rows;
    } catch (error) {
        console.error('Error listing all product types', error);
        throw error;
    }
}

//ORDEN
// crear orden -- verificar funcionalidad
export async function createOrder(mesaId) {
    try {
        // Consulta para insertar un nuevo registro en la tabla orden con un estado predeterminado y obtener su ID
        const query = {
        text: 'INSERT INTO orden (id_mesa) VALUES ($1) RETURNING id',
        values: [mesaId]
        };
        const result = await client.query(query);

        return result.rows[0].id;
    } catch (error) {
        console.error('Error creating order', error);
        throw error;
    }
}

// cambiar estado de orden a cerrado
export async function closeOrder(orderId) {
    try {
        const query = {
            text: 'UPDATE orden SET estado = $1 WHERE id = $2',
            values: ['cerrado', orderId]
        };
    
        await client.query(query);
    
        console.log('Orden cerrada exitosamente.');
    } catch (error) {
        console.error('Error closing order', error);
        throw error;
    }
}

// listar todas las ordenes
export async function listOpenOrders() {
    try {
      const query = {
        text: 'SELECT * FROM orden WHERE estado = $1',
        values: ['abierto']
      };
  
      const result = await client.query(query);
  
      return result.rows;
    } catch (error) {
      console.error('Error listing open orders', error);
      throw error;
    }
}

// ingresar producto a una orden
export async function addOrderContent(orderId, cantidadProducto, productId) {
    try {
      const query = {
        text: 'INSERT INTO contenido_orden (id_orden, cantidad_producto, id_producto) VALUES ($1, $2, $3)',
        values: [orderId, cantidadProducto, productId]
      };
      const result = await client.query(query);
  
      console.log('Contenido agregado a la orden exitosamente.');
    } catch (error) {
      console.error('Error adding order content', error);
      throw error;
    }
}

// marcar producto como servido, cambia el estado de completado a true
// para marcar producto como realizado
export async function markProductCompleted(orderId, productId) {
    try {
      const query = {
        text: 'UPDATE contenido_orden SET completado = true WHERE id_orden = $1 AND id_producto = $2',
        values: [orderId, productId]
      };
      const result = await client.query(query);
  
      const rowsAffected = result.rowCount;

        if (rowsAffected > 0) {
        console.log('Producto marcado como completado en la orden exitosamente.');
        return true; // Se afectó al menos una fila
        } else {
        console.log('El producto no se encontró en la orden o ya estaba marcado como completado.');
        return false; // No se afectó ninguna fila
        }
    } catch (error) {
        console.error('Error marking product completed in order', error);
        throw error;
    }
}
// crear una factura -- verificar funcionalidad
// 1. crea la factura sin valor en total, 2. consigue el total final de la factura, 3. actualiza el atributo total de la factura
export async function createInvoice(nombreCliente, nit, orderId, direccion) {
    try {
        // Paso 1: Crear el registro de la factura
        const createInvoiceQuery = {
            text: 'INSERT INTO factura (nombre_cliente, nit, id_orden, direccion) VALUES ($1, $2, $3, $4) RETURNING id',
            values: [nombreCliente, nit, orderId, direccion]
        };
        const createInvoiceResult = await client.query(createInvoiceQuery);
        const invoiceId = createInvoiceResult.rows[0].id;
    
        // Paso 2: Obtener el total utilizando la siguiente consulta
        const getTotalQuery = {
            text: `SELECT f.id, SUM(co.cantidad_producto * pr.precio) AS total
                FROM factura f
                JOIN orden o ON (o.id = f.id_orden)
                JOIN contenido_orden co ON (co.id_orden = f.id_orden)
                JOIN producto pr ON (co.id_producto = pr.id)
                WHERE f.id = $1
                AND o.estado = 'cerrado'
                AND co.completado = true
                GROUP BY f.id`,
            values: [invoiceId]
        };
        const getTotalResult = await client.query(getTotalQuery);
        const total = getTotalResult.rows[0].total;
    
        // Paso 3: Actualizar el registro de la factura con el total obtenido
        const updateTotalQuery = {
            text: 'UPDATE factura SET total = $1 WHERE id = $2',
            values: [total, invoiceId]
        };
        await client.query(updateTotalQuery);

        // Paso 4: Obtener la factura actualizada
        const getInvoiceQuery = {
            text: 'SELECT * FROM factura WHERE id = $1',
            values: [invoiceId]
        };
        const getInvoiceResult = await client.query(getInvoiceQuery);
        const updatedInvoice = getInvoiceResult.rows[0];
    
        return updatedInvoice;
    } catch (error) {
        console.error('Error creating invoice', error);
        throw error;
    }
}

// listar los contenidos de la factura
// el total que muestra solo es de la cantida de prodcuto*precio del producto
// devuelve id de factura, id de orden, el producto, cantidad del prod, precio, nombre, y totalProd
export async function showInvoiceContentsAndTotal(facturaId) {
    try {
        const query = {
            text: `SELECT f.id, f.id_orden, co.id_producto, co.cantidad_producto, pr.nombre, pr.precio, (co.cantidad_producto * pr.precio) AS totalProd
                FROM factura f
                JOIN orden o ON (o.id = f.id_orden)
                JOIN contenido_orden co ON (co.id_orden = f.id_orden)
                JOIN producto pr ON (co.id_producto = pr.id)
                WHERE f.id = $1
                AND o.estado = 'cerrado'
                AND co.completado = true`,
            values: [facturaId]
        };
    
        const result = await client.query(query);
    
        return result.rows;
    } catch (error) {
        console.error('Error showing invoice contents and total', error);
        throw error;
    }
}

// ingresar un pago a una factura especifica
// considerar verificar si ya se pago en completo toda la factura antes de ingresar un nuevo registro
export async function addPaymentToInvoice(invoiceId, formaPago, cantidadPago) {
    try {
        const query = {
            text: 'INSERT INTO pago_factura (id_factura, forma_pago, cantidad_pago) VALUES ($1, $2, $3)',
            values: [invoiceId, formaPago, cantidadPago],
        };
    
        await client.query(query);
        console.log('Pago registrado exitosamente.');
    } catch (error) {
        console.error('Error adding payment to invoice', error);
        throw error;
    }
}




// para vistas especificas
// Cocina
export async function getUnservedDishes() {
    try {
        const query = {
            text: `SELECT o.id AS order_id, o.id_mesa, p.nombre AS producto, co.cantidad_producto
                FROM contenido_orden co
                JOIN producto p ON co.id_producto = p.id
                JOIN orden o ON co.id_orden = o.id
                WHERE p.tipo = 1
                AND co.completado = false`
        };
    
        const result = await client.query(query);
        return result.rows;
    } catch (error) {
        console.error('Error getting unserved dishes', error);
        throw error;
    }
}

//bar
export async function getUnservedDrinks() {
    try {
        const query = {
            text: `SELECT o.id AS order_id, o.id_mesa, p.nombre AS producto, co.cantidad_producto
                FROM contenido_orden co
                JOIN producto p ON co.id_producto = p.id
                JOIN orden o ON co.id_orden = o.id
                WHERE p.tipo = 2
                AND co.completado = false`
        };
    
        const result = await client.query(query);
        return result.rows;
    } catch (error) {
        console.error('Error getting unserved drinks', error);
        throw error;
    }
}

// Función para obtener una orden y sus productos asociados
export async function getOrderWithProducts(orderId) {
    try {
        const query = {
            text: `SELECT o.id AS order_id, o.id_mesa, p.nombre AS producto, co.cantidad_producto, p.precio
                FROM orden o
                JOIN contenido_orden co ON o.id = co.id_orden
                JOIN producto p ON co.id_producto = p.id
                WHERE o.id = $1`,
            values: [orderId]
        };
  
        const result = await client.query(query);
        return result.rows;
    } catch (error) {
        console.error('Error getting order with products', error);
        throw error;
    }
}

// funcion para obtener una factura basandose en una orden
export async function getInvoiceByOrderId(orderId) {
    try {
        const query = {
            text: `SELECT id FROM factura WHERE id_orden = $1`,
            values: [orderId]
        };

        const result = await client.query(query);
        return result.rows; // Solo se espera una factura por orden
    } catch (error) {
        console.error('Error getting invoice by order ID', error);
        throw error;
    }
}

//REPORTES
//Reporte 1
// Función para obtener los productos más pedidos dentro de un rango de fechas
export async function getMostOrderedProducts(startDate, endDate) { //se pasan strings formato YYYY-MM-DD
    try {
        const query = {
            text: `SELECT co.id_producto, pr.nombre, COUNT(co.id_producto) AS cantP
                FROM contenido_orden co
                JOIN producto pr ON pr.id = co.id_producto
                JOIN orden o ON o.id = co.id_orden
                WHERE o.fecha BETWEEN SYMMETRIC to_date($1, 'YYYY-MM-DD') AND to_date($2, 'YYYY-MM-DD')
                GROUP BY co.id_producto, pr.nombre
                ORDER BY cantP DESC`,
            values: [startDate, endDate]
        };
    
        const result = await client.query(query);
        return result.rows;
    } catch (error) {
        console.error('Error getting most ordered products', error);
        throw error;
    }
}

// Reporte 2
// Función para obtener el horario con más pedidos dentro de un rango de fechas
//envia los primeros 2 horarios en donde entran mas ordenes, en caso de que solo se quiera una de las 2 horas o si son muy separadas ej: 9pm y 10am
export async function getPeakOrderHours(startDate, endDate) {
    try {
        const query = {
            text: `SELECT EXTRACT(HOUR FROM tiempo) AS horario, COUNT(EXTRACT(HOUR FROM tiempo)) AS cantidad
                FROM contenido_orden co
                JOIN orden o ON o.id = co.id_orden
                WHERE o.fecha BETWEEN SYMMETRIC to_date($1, 'YYYY-MM-DD') AND to_date($2, 'YYYY-MM-DD')
                GROUP BY horario
                ORDER BY cantidad DESC
                LIMIT 2`,
            values: [startDate, endDate]
        };
    
        const result = await client.query(query);
        return result.rows;
    } catch (error) {
        console.error('Error getting peak order hours', error);
        throw error;
    }
}

// Reporte 3
// Función para obtener el promedio de tiempo que tardan los clientes en comer
export async function getAverageEatingTime(startDate, endDate) {
    try {
        const query = {
            text: `SELECT cantidad_comensales,
                    EXTRACT(HOUR FROM AVG(f.fecha - o.fecha)) AS promedio_horas,
                    EXTRACT(MINUTE FROM AVG(f.fecha - o.fecha)) AS promedio_minutos
                FROM orden o
                JOIN factura f ON o.id = f.id_orden
                WHERE o.fecha BETWEEN SYMMETRIC to_date($1, 'YYYY-MM-DD') AND to_date($2, 'YYYY-MM-DD')
                GROUP BY cantidad_comensales`,
            values: [startDate, endDate]
        };
  
        const result = await client.query(query);
        return result.rows;
    } catch (error) {
        console.error('Error getting average eating time', error);
        throw error;
    }
}

// Reporte 4
// Función para obtener el reporte de quejas agrupadas por empleado
export async function getEmployeeComplaintsReport(startDate, endDate) {
    try {
        const query = {
            text: `SELECT qj.id_empleado, us.username, us.rol, qj.motivo, qj.severidad, DATE(qj.fecha_hora) AS fecha
                FROM queja qj
                JOIN users us ON us.id = qj.id_empleado
                WHERE qj.fecha_hora BETWEEN SYMMETRIC to_date($1, 'YYYY-MM-DD') AND to_date($2, 'YYYY-MM-DD')
                AND qj.id_empleado IS NOT NULL
                ORDER BY qj.id_empleado`,
            values: [startDate, endDate]
        };
    
        const result = await client.query(query);
        return result.rows;
    } catch (error) {
        console.error('Error getting employee complaints report', error);
        throw error;
    }
  }

// Reporte 5
// Función para obtener el reporte de quejas agrupadas por producto
export async function getProductComplaintsReport(startDate, endDate) {
    try {
        const query = {
            text: `SELECT qj.id_producto, pr.nombre, qj.motivo, qj.severidad, DATE(qj.fecha_hora) AS fecha
                FROM queja qj
                JOIN producto pr ON qj.id_producto = pr.id
                WHERE qj.fecha_hora BETWEEN SYMMETRIC to_date($1, 'YYYY-MM-DD') AND to_date($2, 'YYYY-MM-DD')
                AND qj.id_producto IS NOT NULL
                ORDER BY qj.id_producto`,
            values: [startDate, endDate]
        };
    
        const result = await client.query(query);
        return result.rows;
    } catch (error) {
        console.error('Error getting product complaints report', error);
        throw error;
    }
}

// Reporte 6
export async function getWaiterEfficiencyReport() {
    try {
        const query = {
            text: `SELECT co.id_mesero,
                    usr.username as nameWaiter,
                    EXTRACT(MONTH FROM co.fecha_hora) AS mes,
                    ROUND(AVG(co.amabilidad), 2) AS promedio_amabilidad,
                    ROUND(AVG(co.exactitud), 2) AS promedio_exactitud
                FROM calificacion_mesero co
                JOIN users usr ON usr.id = co.id_mesero
                WHERE co.fecha_hora >= CURRENT_DATE - INTERVAL '6 months'
                GROUP BY co.id_mesero, EXTRACT(MONTH FROM fecha_hora), nameWaiter
                ORDER BY co.id_mesero, mes`
        };
    
        const result = await client.query(query);
        return result.rows;
    } catch (error) {
        console.error('Error getting waiter efficiency report', error);
        throw error;
    }
}