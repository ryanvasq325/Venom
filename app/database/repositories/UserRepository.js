import { drizzle } from 'drizzle-orm/node-postgres';
import { ilike, or, sql, asc } from 'drizzle-orm';
import Connection from '../Connection.js';
import { users } from '../schema.js';

export default class UserRepository {
    static async insert(data) {
        const client = await Connection.connect();
        const db = drizzle(client);
        try {
            const result = await db.insert(users).values({
                name: data.name,
                email: data.email
            }).returning();
            return result[0];
        } finally {
            client.release();
        }
    }
    static async search(data) {
                //Captura o termo de pesquisa sem o %%
                const rawSearch = String(data?.term ?? '').trim();
                //Captura o termo da pesquisa já aplicando o %%
                const terms = `%${data?.term}%`;
                try {
                    //Abre a conexão com banco de dados
                    const client = await Connection.connect();
                    const db = drizzle(client);
                    const whereClause =
                        rawSearch !== ''
                            ? or(
                                sql`${users.id}::text ILIKE ${terms}`,
                                ilike(users.name, terms),
                                sql`${users.email}::text ILIKE ${terms}`
                            )
                            : undefined;
        
                    const result = await db
                        .select()
                        .from(users)
                        .where(whereClause)
                        .orderBy(asc(users.name,users.email))
                        .offset(data?.offset)
                        .limit(data?.limit);
        
                    return {
                        data: result
                    };
                } catch (error) {
                    console.error('[UserRepository] Erro na busca:', error.message);
                    return {
                        recordsTotal: 0,
                        recordsFiltered: 0,
                        data: [],
                    };
                }
            }
}