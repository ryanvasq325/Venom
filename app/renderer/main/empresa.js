const saveButton = document.getElementById('save-button');

saveButton.addEventListener('click', async () => {
    const data = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
    };

    try {
        const result = await window.electronAPI.saveCompany(data);
        console.log('Empresa salva com sucesso:', result);
        alert('Empresa salva com sucesso!');
    } catch (error) {
        console.error('Erro ao salvar empresa:', error);
        alert('Erro ao salvar empresa!');
    }
});