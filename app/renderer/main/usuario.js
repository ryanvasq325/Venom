const saveButton = document.getElementById('save-button');

saveButton.addEventListener('click', async () => {
    const data = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
    };

    try {
        const result = await window.electronAPI.saveUser(data);
        console.log('Usuario salvo com sucesso:', result);
        alert('Usuario salvo com sucesso!');
    } catch (error) {
        console.error('Erro ao salvar usuario:', error);
        alert('Erro ao salvar usuario!');
    }
});