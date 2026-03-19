import dotenv from 'dotenv';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { app } from 'electron';

const __dirname = path.dirname(fileURLToPath(import.meta.url));


const envPath = app.isPackaged
    ? path.join(path.dirname(app.getPath('exe')), '.env')
    : path.resolve(__dirname, '..', '..', '.env');

const result = dotenv.config({ path: envPath });

if (result.error) {
    console.error('[ENV] Falha ao carregar .env em:', envPath);
} else {
    console.log('[ENV] .env carregado de:', envPath);
}