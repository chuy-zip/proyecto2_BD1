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
    addEmployeeDishComplaint,
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
    createInvoice,
    showInvoiceContentsAndTotal,
    addPaymentToInvoice,
    getUnservedDishes,
    getUnservedDrinks,
    getOrderWithProducts,
    getInvoiceByOrderId,
  } from './db.js';

const app = express()
const port = 3000

app.use(express.json())
app.use(cors({
    origin: '*',
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

app.get('/users/:id', async (req, res) => {
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

app.listen(port, () => {
    console.log(`Server listening at http://127.0.0.1:${port}`)
})