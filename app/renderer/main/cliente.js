const saveButton = document.getElementById('save-button');

saveButton.addEventListener('click', async () => {
    const data = {
        name: document.getElementById('name').value,
        cpf: document.getElementById('cpf').value,
    };

    try {
        const result = await window.electronAPI.saveClient(data);
        console.log('Cliente salvo com sucesso:', result);

        await Swal.fire({
            icon: 'success',
            title: 'Sucesso!',
            text: 'Cliente salvo com sucesso.',
            confirmButtonText: 'OK',
            timer: 3000,
            timerProgressBar: true,
        });

    } catch (error) {
        console.error('Erro ao salvar cliente:', error);

        await Swal.fire({
            icon: 'error',
            title: 'Erro!',
            text: 'Não foi possível salvar o cliente. Tente novamente.',
            confirmButtonText: 'Fechar',
        });
    }
});