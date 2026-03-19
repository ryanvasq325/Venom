
import { Pool } from 'pg';
import { app } from 'electron';
import path from 'node:path';
import { appendFileSync, mkdirSync } from 'node:fs';

function logError(context, err) {
    try {
        const logDir  = app.getPath('userData');
        const logFile = path.join(logDir, 'error.log');
        const line    = `[${new Date().toISOString()}] [${context}] ${err?.message ?? err}\n`;
        mkdirSync(logDir, { recursive: true });
        appendFileSync(logFile, line, 'utf-8');
        console.error(line);
    } catch (_) {}
}

const pool = new Pool({
    host:                    process.env.DB_HOST,
    port:                    Number(process.env.DB_PORT                   || 5432),
    database:                process.env.DB_NAME,
    user:                    process.env.DB_USER,
    password:                process.env.DB_PASSWORD,
    max:                     Number(process.env.DB_POOL_MAX               || 10),
    idleTimeoutMillis:       Number(process.env.DB_IDLE_TIMEOUT_MS        || 10000),
    connectionTimeoutMillis: Number(process.env.DB_CONNECTION_TIMEOUT_MS  || 5000),
    application_name:        process.env.DB_APP_NAME                      || 'venom-electron',
});

pool.on('error', (err) => logError('pool:idle', err));

export default class Connection {
    static async connect() {
        try {
            return await pool.connect();
        } catch (err) {
            logError('Connection.connect', err);
            throw err; 
        }
    }

    static async test() {
        try {
            const client = await pool.connect();
            await client.query('SELECT 1');
            client.release();
            console.log('[DB] ✓ PostgreSQL conectado');
            console.log('[DB]   Host:',  process.env.DB_HOST);
            console.log('[DB]   Banco:', process.env.DB_NAME);
            return true;
        } catch (err) {
            logError('Connection.test', err);
            return false;
        }
    }
}