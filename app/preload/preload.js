const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    openPage: (pageName) => ipcRenderer.invoke('window:open-page', pageName),
    goHome: () => ipcRenderer.invoke('window:open-page', 'index.html'),
    saveProduct: (data) => ipcRenderer.invoke('product:save', data),
    saveClient: (data) => ipcRenderer.invoke('client:save', data),
    saveUser: (data) => ipcRenderer.invoke('user:save', data),
    saveCompany: (data) => ipcRenderer.invoke('company:save', data),
});