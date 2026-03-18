const saveButton = document.getElementById('save-button');

saveButton.addEventListener('click', async () => {
    const data = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
    };

    try {
        const result = await window.electronAPI.saveUser(data);
        console.log('Usuario salvo com sucesso:', result);

        await Swal.fire({
            icon: 'success',
            title: 'Sucesso!',
            text: 'Usuário salvo com sucesso.',
            confirmButtonText: 'OK',
            timer: 3000,
            timerProgressBar: true,
        });

    } catch (error) {
        console.error('Erro ao salvar usuario:', error);

        await Swal.fire({
            icon: 'error',
            title: 'Erro!',
            text: 'Não foi possível salvar o usuário. Tente novamente.',
            confirmButtonText: 'Fechar',
        });
    }
});