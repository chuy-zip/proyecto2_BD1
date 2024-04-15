import express from 'express'
import cors from 'cors'
import {
    getUsers,
    registerUser,
    verifyUser,
    getUserById,
    assignWaiterToArea,
    getAreasForWaiter,
    removeWaiterFromArea,
    listAllAreas,
    createArea,
    deleteArea,
    listAllTables,
    createTable,
    deleteTable,
    assignTableToArea,
    removeTableFromArea,
    listTablesInArea,
    addRatingToWaiter,
    addDishComplaint,
    addEmployeeComplaint,
    addProduct,
    deleteProduct,
    listAllProducts,
    addProductType,
    deleteProductType,
    listAllProductTypes,
    createOrder,
    closeOrder,
    listOpenOrders,
    addOrderContent,
    markProductCompleted,
    getMostOrderedProducts,
    createInvoice,
    showInvoiceContentsAndTotal,
    addPaymentToInvoice,
    getUnservedDishes,
    getUnservedDrinks,
    getOrderWithProducts,
    getInvoiceByOrderId,
    getPeakOrderHours,
    getAverageEatingTime,
    getEmployeeComplaintsReport,
    getProductComplaintsReport,
    getWaiterEfficiencyReport,
    getComplaints,
    getPaymentsByInvoiceId
  } from './db.js';

const app = express()
const port = 8080

app.use(express.json())
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type'],
}))

app.get('/users', async (req, res) => {
    try {
        const users = await getUsers()
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json({ error: 'Internal server error'})
    }
})

// Endpoint para registrar un nuevo usuario
app.post('/users/register', async (req, res) => {
    const { username, password, rol } = req.body;
    try {
        const success = await registerUser(username, password, rol);
        if (success) {
            res.status(201).json({ message: 'User registered successfully' });
        } else {
            res.status(400).json({ error: 'Failed to register user' });
        }
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/users/login', async (req, res) => {
const { username, password } = req.body;
    try {
        const isValidUser = await verifyUser(username, password);
        if (isValidUser) {
            res.status(200).json({ message: 'User authenticated successfully' });
        } else {
            res.status(401).json({ error: 'Invalid credentials' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/users/:id', async (req, res) => { //revision
    const { id } = req.params;
    try {
        const user = await getUserById(id);
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Endpoints para meseros
app.post('/waiters/assign', async (req, res) => { //sirve
    const { userId, areaId } = req.body;
    try {
      const success = await assignWaiterToArea(userId, areaId);
      if (success) {
        res.status(200).json({ message: 'Waiter assigned to area successfully' });
      } else {
        res.status(400).json({ error: 'Failed to assign waiter to area' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
});
  
app.get('/waiters/:userId/areas', async (req, res) => { //sirve
    const { userId } = req.params;
    try {
      const areas = await getAreasForWaiter(userId);
      res.status(200).json(areas);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
});
  
app.delete('/waiters/:userId/areas/:areaId', async (req, res) => { //sirve
    const { userId, areaId } = req.params;
    try {
      const success = await removeWaiterFromArea(userId, areaId);
      if (success) {
        res.status(200).json({ message: 'Waiter removed from area successfully' });
      } else {
        res.status(404).json({ error: 'Waiter or area not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
});

// Endpoint para listar todas las áreas
app.get('/areas', async (req, res) => { //sirve
    try {
        const areas = await listAllAreas();
        res.status(200).json(areas);
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Endpoint para crear una nueva área
app.post('/areas', async (req, res) => { //sirve
    const { nombre, fumadores } = req.body;
    try {
        const areaCreada = await createArea(nombre, fumadores);
        if (areaCreada) {
            res.status(201).json({ message: 'Área creada exitosamente' });
        } else {
            res.status(400).json({ error: 'No se pudo crear el área' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Endpoint para eliminar un área por su ID
app.delete('/areas/:areaId', async (req, res) => { //sirve
    const { areaId } = req.params;
    try {
        const areaEliminada = await deleteArea(areaId);
        if (areaEliminada) {
            res.status(200).json({ message: 'Área eliminada exitosamente' });
        } else {
            res.status(404).json({ error: 'El área no existe o ya ha sido eliminada' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Endpoint para listar todas las mesas
app.get('/tables', async (req, res) => {
    try {
        const tables = await listAllTables();
        res.status(200).json(tables);
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Endpoint para crear una nueva mesa
app.post('/tables', async (req, res) => {
    const { capacidad, movible } = req.body;
    try {
        const mesaCreada = await createTable(capacidad, movible);
        if (mesaCreada) {
            res.status(201).json({ message: 'Mesa creada exitosamente' });
        } else {
            res.status(400).json({ error: 'No se pudo crear la mesa' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Endpoint para eliminar una mesa por su ID
app.delete('/tables/:tableId', async (req, res) => {
    const { tableId } = req.params;
    try {
        const mesaEliminada = await deleteTable(tableId);
        if (mesaEliminada) {
            res.status(200).json({ message: 'Mesa eliminada exitosamente' });
        } else {
            res.status(404).json({ error: 'La mesa no existe o ya ha sido eliminada' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Endpoint para asignar una mesa a un área
app.put('/tables/:tableId/assign/:areaId', async (req, res) => {
    const { tableId, areaId } = req.params;
    try {
        const mesaAsignada = await assignTableToArea(tableId, areaId);
        if (mesaAsignada) {
            res.status(200).json({ message: 'Mesa asignada al área exitosamente' });
        } else {
            res.status(404).json({ error: 'No se pudo encontrar la mesa o el área' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Endpoint para eliminar una mesa de un área
app.put('/tables/:tableId/remove', async (req, res) => {
    const { tableId } = req.params;
    try {
        const mesaRemovida = await removeTableFromArea(tableId);
        if (mesaRemovida) {
            res.status(200).json({ message: 'Mesa removida del área exitosamente' });
        } else {
            res.status(404).json({ error: 'La mesa no se encontró en ningún área o ya ha sido removida' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Endpoint para listar todas las mesas de un área
app.get('/tables/area/:areaId', async (req, res) => {
    const { areaId } = req.params;
    try {
        const mesas = await listTablesInArea(areaId);
        res.status(200).json(mesas);
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Endpoint para calificar a un mesero
app.post('/waiter/:waiterId/rating', async (req, res) => {
    const { waiterId } = req.params;
    const { amabilidad, exactitud } = req.body;
    try {
        const calificacionAgregada = await addRatingToWaiter(waiterId, amabilidad, exactitud);
        if (calificacionAgregada) {
            res.status(200).json({ message: 'Calificación agregada exitosamente' });
        } else {
            res.status(404).json({ error: 'No se pudo agregar la calificación al mesero' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Endpoint para agregar una queja de un empleado respecto a un platillo
app.post('/employee/:employeeId/dish/:dishId/complaint', async (req, res) => {
    const { employeeId, dishId } = req.params;
    const { motivo, severidad } = req.body;
    try {
        if (employeeId === '0') {
            // Llamar a la función para agregar una queja de un platillo
            const quejaAgregada = await addDishComplaint(dishId, motivo, severidad);
            if (quejaAgregada) {
                res.status(200).json({ message: 'Queja agregada exitosamente' });
            } else {
                res.status(404).json({ error: 'No se pudo agregar la queja del platillo' });
            }
        } else if (dishId === '0') {
            // Llamar a la función para agregar una queja de un empleado
            const quejaAgregada = await addEmployeeComplaint(employeeId, motivo, severidad);
            if (quejaAgregada) {
                res.status(200).json({ message: 'Queja agregada exitosamente' });
            } else {
                res.status(404).json({ error: 'No se pudo agregar la queja del empleado' });
            }
        } else {
            // Enviar un error si ninguno de los parámetros es igual a 0
            res.status(400).json({ error: 'Debe especificar un employeeId o un dishId igual a 0' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

app.get('/complaints', async (req, res) => {
    try {
        const complaints = await getComplaints()
        res.status(200).json(complaints)
    } catch (error) {
        res.status(500).json({ error: 'Internal server error'})
    }
})

// Endpoint para agregar un producto
app.post('/products', async (req, res) => {
    const { nombre, descripcion, precio, tipo } = req.body;
    try {
        const productoAgregado = await addProduct(nombre, descripcion, precio, tipo);
        if (productoAgregado) {
            res.status(200).json({ message: 'Producto agregado exitosamente' });
        } else {
            res.status(404).json({ error: 'No se pudo agregar el producto' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Endpoint para eliminar un producto
app.delete('/products/:productId', async (req, res) => {
    const { productId } = req.params;
    try {
        const productoEliminado = await deleteProduct(productId);
        if (productoEliminado) {
            res.status(200).json({ message: 'Producto eliminado exitosamente' });
        } else {
            res.status(404).json({ error: 'No se pudo eliminar el producto' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Endpoint para obtener todos los productos
app.get('/products', async (req, res) => {
    try {
        const productos = await listAllProducts();
        res.status(200).json(productos);
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Endpoint para agregar un tipo de producto
app.post('/product-types', async (req, res) => {
    const { nombreTipo } = req.body;
    try {
        const tipoAgregado = await addProductType(nombreTipo);
        if (tipoAgregado) {
            res.status(200).json({ message: 'Tipo de producto agregado exitosamente' });
        } else {
            res.status(404).json({ error: 'No se pudo agregar el tipo de producto' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Endpoint para eliminar un tipo de producto
app.delete('/product-types/:typeId', async (req, res) => {
    const { typeId } = req.params;
    try {
        const tipoEliminado = await deleteProductType(typeId);
        if (tipoEliminado) {
            res.status(200).json({ message: 'Tipo de producto eliminado exitosamente' });
        } else {
            res.status(404).json({ error: 'No se pudo eliminar el tipo de producto' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Endpoint para obtener todos los tipos de producto
app.get('/product-types', async (req, res) => {
    try {
        const tiposProductos = await listAllProductTypes();
        res.status(200).json(tiposProductos);
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Endpoint para crear una orden
app.post('/orders', async (req, res) => {
    const { mesaId } = req.body;
    try {
        const orderId = await createOrder(mesaId);
        res.status(200).json({ orderId });
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Endpoint para cambiar el estado de una orden a cerrado
app.put('/orders/:orderId/close', async (req, res) => {
    const { orderId } = req.params;
    try {
        await closeOrder(orderId);
        res.status(200).json({ message: 'Orden cerrada exitosamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Endpoint para obtener todas las órdenes abiertas
app.get('/orders', async (req, res) => {
    try {
        const orders = await listOpenOrders();
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Endpoint para agregar un producto a una orden
app.post('/orders/:orderId/products', async (req, res) => {
    const { orderId } = req.params;
    const { cantidadProducto, productId } = req.body;
    try {
        await addOrderContent(orderId, cantidadProducto, productId);
        res.status(200).json({ message: 'Producto agregado a la orden exitosamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Endpoint para marcar un producto como completado en una orden
app.put('/orders/:orderId/products/:productId/completed', async (req, res) => {
    const { orderId, productId } = req.params;
    try {
        const success = await markProductCompleted(orderId, productId);
        if (success) {
            res.status(200).json({ message: 'Producto marcado como completado en la orden exitosamente' });
        } else {
            res.status(404).json({ error: 'El producto no se encontró en la orden o ya estaba marcado como completado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Endpoint para crear una factura
app.post('/invoices', async (req, res) => {
    const { nombreCliente, nit, orderId, direccion } = req.body;
    try {
        const invoice = await createInvoice(nombreCliente, nit, orderId, direccion);
        res.status(200).json(invoice);
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Endpoint para listar los contenidos de la factura y el total
app.get('/invoices/:invoiceId/contents', async (req, res) => {
    const { invoiceId } = req.params;
    try {
        const contents = await showInvoiceContentsAndTotal(invoiceId);
        res.status(200).json(contents);
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Endpoint para agregar un pago a una factura
app.post('/invoices/:invoiceId/payments', async (req, res) => {
    const { invoiceId } = req.params;
    const { formaPago, cantidadPago } = req.body;
    try {
        await addPaymentToInvoice(invoiceId, formaPago, cantidadPago);
        res.status(200).json({ message: 'Pago registrado exitosamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Endpoint para obtener los pagos realizados a una factura y el saldo pendiente
app.get('/invoices/:invoiceId/payments-done', async (req, res) => {
    const { invoiceId } = req.params;
    try {
        if (!invoiceId) {
            return res.status(400).json({ error: 'Se debe proporcionar el ID de la factura' });
        }
        const payments = await getPaymentsByInvoiceId(invoiceId);
        if (payments.length === 0) {
            return res.status(404).json({ message: 'No se encontraron pagos para la factura especificada' });
        }

        res.status(200).json(payments);
    } catch (error) {
        console.error('Error en el endpoint de los pagos de la factura:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Endpoint para obtener los platos no servidos
app.get('/kitchen/unserved-dishes', async (req, res) => {
    try {
        const unservedDishes = await getUnservedDishes();
        res.status(200).json(unservedDishes);
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Endpoint para obtener las bebidas no servidas
app.get('/bar/unserved-drinks', async (req, res) => {
    try {
        const unservedDrinks = await getUnservedDrinks();
        res.status(200).json(unservedDrinks);
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Endpoint para obtener una orden y sus productos asociados
app.get('/orders/:orderId', async (req, res) => {
    const { orderId } = req.params;
    try {
        const orderWithProducts = await getOrderWithProducts(orderId);
        res.status(200).json(orderWithProducts);
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Endpoint para obtener una factura basada en una orden
app.get('/invoices/by-order/:orderId', async (req, res) => {
    const { orderId } = req.params;
    try {
        const invoice = await getInvoiceByOrderId(orderId);
        res.status(200).json(invoice);
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Endpoint para obtener los productos más pedidos dentro de un rango de fechas (Reporte 1)
app.get('/reports/most-ordered-products', async (req, res) => {
    const { startDate, endDate } = req.query;
    try {
        // Verificar si startDate y endDate están presentes en la solicitud
        // if (!startDate || !endDate) {
        //     return res.status(400).json({ error: 'Se deben proporcionar las fechas de inicio y fin en el formato YYYY-MM-DD' });
        // }

        // Llamar a la función para obtener los productos más pedidos
        const mostOrderedProducts = await getMostOrderedProducts(startDate, endDate);
        res.status(200).json(mostOrderedProducts);
    } catch (error) {
        console.error('Error en el endpoint de los productos más pedidos:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Endpoint para obtener el horario con más pedidos dentro de un rango de fechas (Reporte 2)
app.get('/reports/peak-order-hours', async (req, res) => {
    const { startDate, endDate } = req.query;
    try {
        const peakOrderHours = await getPeakOrderHours(startDate, endDate);
        res.status(200).json(peakOrderHours);
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Endpoint para obtener el promedio de tiempo que tardan los clientes en comer (Reporte 3)
app.get('/reports/average-eating-time', async (req, res) => {
    const { startDate, endDate } = req.query;
    try {
        const averageEatingTime = await getAverageEatingTime(startDate, endDate);
        res.status(200).json(averageEatingTime);
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Endpoint para obtener el reporte de quejas agrupadas por empleado (Reporte 4)
app.get('/reports/employee-complaints', async (req, res) => {
    const { startDate, endDate } = req.query;
    try {
        const employeeComplaintsReport = await getEmployeeComplaintsReport(startDate, endDate);
        res.status(200).json(employeeComplaintsReport);
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Endpoint para obtener el reporte de quejas agrupadas por producto (Reporte 5)
app.get('/reports/product-complaints', async (req, res) => {
    const { startDate, endDate } = req.query;
    try {
        const productComplaintsReport = await getProductComplaintsReport(startDate, endDate);
        res.status(200).json(productComplaintsReport);
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Endpoint para obtener el reporte de eficiencia de meseros (Reporte 6)
app.get('/reports/waiter-efficiency', async (req, res) => {
    try {
        const waiterEfficiencyReport = await getWaiterEfficiencyReport();
        res.status(200).json(waiterEfficiencyReport);
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

app.listen(port, () => {
    console.log(`Server listening at http://127.0.0.1:${port}`)
})