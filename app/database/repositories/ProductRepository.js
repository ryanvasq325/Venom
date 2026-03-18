import { drizzle } from 'drizzle-orm/node-postgres';
import Connection from '../Connection.js';
import { products } from '../schema.js';

export default class ProductRepository {
    static async insert(data) {
        const client = await Connection.connect();
        const db = drizzle(client);
        try {
            const result = await db.insert(products).values({
                name: data.name,
                price: data.price
            }).returning();
            return result[0];
        } finally {
            client.release();
        }
    }
    static async search(data) {
       const rawSearch = String(data?.term ?? '').trim();
       const terms = `%${data?.term}%`;
       try {
           const client = await Connection.connect();
           const db = drizzle(client);
        const whereClause = rawSearch !== ''
        ? or (
            sql``
        )
       }






            // Dados da página
            const data = await db
                .select()
                .from(products)
                .where(sql`
                    name     ILIKE ${term}
                    OR category ILIKE ${term}
                `)
                .limit(length)
                .offset(start)
                .orderBy(products.name);

            return {
                draw,
                recordsTotal,
                recordsFiltered,
                data,
            };

        } catch (error) {
            console.error('[ProductRepository] Erro na busca:', error.message);

            return {
                draw,
                recordsTotal: 0,
                recordsFiltered: 0,
                data: [],
            };
        }
    }
}