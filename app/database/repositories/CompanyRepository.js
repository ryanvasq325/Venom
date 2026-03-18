import { drizzle } from 'drizzle-orm/node-postgres';
import { ilike, or, sql, asc } from 'drizzle-orm';
import Connection from '../Connection.js';
import { company } from '../schema.js';

export default class CompanyRepository {
    static async insert(data) {
        const client = await Connection.connect();
        const db = drizzle(client);
        try {
            const result = await db.insert(company).values({
                name: data.name,
                cnpj: data.cnpj
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
                                sql`${company.id}::text ILIKE ${terms}`,
                                ilike(company.name, terms),
                                sql`${company.cnpj}::text ILIKE ${terms}`
                            )
                            : undefined;
        
                    const result = await db
                        .select()
                        .from(company)
                        .where(whereClause)
                        .orderBy(asc(company.name,company.cnpj))
                        .offset(data?.offset)
                        .limit(data?.limit);
        
                    return {
                        data: result
                    };
                } catch (error) {
                    console.error('[CompanyRepository] Erro na busca:', error.message);
                    return {
                        recordsTotal: 0,
                        recordsFiltered: 0,
                        data: [],
                    };
                }
            }
}