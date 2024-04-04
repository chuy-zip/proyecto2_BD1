import getClient from "./postgreConn.js"

const client = getClient();

export async function getUsers() {
    try {
        const query = {
            text: 'SELECT * FROM users',
        }

        const result = await client.query(query)
        return result.rows;
        
    } catch (error) {
        console.error('Error getting users', error)
        throw error
    }
}