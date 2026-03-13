const productButton = document.getElementById('product-button');
const clientButton = document.getElementById('client-button');
const userButton = document.getElementById('user-button');
const companyButton = document.getElementById('company-button');

productButton.addEventListener('click', async () => {
    try {
        if (!window.electronAPI || typeof window.electronAPI.openPage !== 'function') {
            throw new Error('API do Electron não foi injetada pelo preload');
        }
        await window.electronAPI.openPage('listaproduto.html');
    } catch (error) {
        console.error('Erro ao abrir a janela de produtos:', error);
    }
});
clientButton.addEventListener('click', async () => {
    try {
        if (!window.electronAPI || typeof window.electronAPI.openPage !== 'function') {
            throw new Error('API do Electron não foi injetada pelo preload');
        }
        await window.electronAPI.openPage('listacliente.html');
    } catch (error) {
        console.error('Erro ao abrir a janela de produtos:', error);
    }
});
userButton.addEventListener('click', async () => {
    try {
        if (!window.electronAPI || typeof window.electronAPI.openPage !== 'function') {
            throw new Error('API do Electron não foi injetada pelo preload');
        }
        await window.electronAPI.openPage('listausuario.html');
    } catch (error) {
        console.error('Erro ao abrir a janela de produtos:', error);
    }
});
companyButton.addEventListener('click', async () => {
    try {
        if (!window.electronAPI || typeof window.electronAPI.openPage !== 'function') {
            throw new Error('API do Electron não foi injetada pelo preload');
        }
        await window.electronAPI.openPage('listaempresa.html');
    } catch (error) {
        console.error('Erro ao abrir a janela de produtos:', error);
    }
});