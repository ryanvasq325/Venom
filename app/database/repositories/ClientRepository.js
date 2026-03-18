import { drizzle } from 'drizzle-orm/node-postgres';
import { ilike, or, sql, asc } from 'drizzle-orm';
import Connection from '../Connection.js';
import { clients } from '../schema.js';

export default class ClientRepository {
    static async insert(data) {
        const client = await Connection.connect();
        const db = drizzle(client);
        try {
            const result = await db.insert(clients).values({
                name: data.name,
                cpf: data.cpf
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
                            sql`${clients.id}::text ILIKE ${terms}`,
                            ilike(clients.name, terms),
                            sql`${clients.cpf}::text ILIKE ${terms}`
                        )
                        : undefined;
    
                const result = await db
                    .select()
                    .from(clients)
                    .where(whereClause)
                    .orderBy(asc(clients.name, clients.id, clients.cpf))
                    .offset(data?.offset)
                    .limit(data?.limit);
    
                return {
                    data: result
                };
            } catch (error) {
                console.error('[ClientRepository] Erro na busca:', error.message);
                return {
                    recordsTotal: 0,
                    recordsFiltered: 0,
                    data: [],
                };
            }
        }
}