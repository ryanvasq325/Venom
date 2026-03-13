import { drizzle } from 'drizzle-orm/node-postgres';
import Connection from '../Connection.js';
import { clients } from '../schema.js';

export default class ClientRepository {
    static async insert(data) {
        const client = await Connection.connect();
        const db = drizzle(client);
        try {
            const result = await db.insert(clients).values({
                name: data.name,
                price: data.price
            }).returning();
            return result[0];
        } finally {
            client.release();
        }
    }
}