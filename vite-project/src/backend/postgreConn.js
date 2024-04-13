import pkg from 'pg';
const { Client } = pkg;

const dbConfig = {
    user: 'postgres',
    password: 'pass1234',
    host: 'localhost',
    port: '5127',
    database: 'restaurant',
};

// Establishing the connection to the db
const client = new Client(dbConfig);
client.connect()
    .then(() => {
        console.log('Connected to PostgreSQL database');
    })
    .catch((err) => {
        console.error('Error connecting to PostgreSQL database', err);
    });

// Export a function to obtain the client instance
const getClient = () => {
    return client;
};

export default getClient;