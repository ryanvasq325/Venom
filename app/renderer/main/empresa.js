const saveButton = document.getElementById('save-button');

saveButton.addEventListener('click', async () => {
    const data = {
        name: document.getElementById('name').value,
        cnpj: document.getElementById('cnpj').value,
    };

    try {
        const result = await window.electronAPI.saveCompany(data);
        console.log('Empresa salva com sucesso:', result);

        await Swal.fire({
            icon: 'success',
            title: 'Sucesso!',
            text: 'Empresa salva com sucesso.',
            confirmButtonText: 'OK',
            timer: 3000,
            timerProgressBar: true,
        });

    } catch (error) {
        console.error('Erro ao salvar empresa:', error);

        await Swal.fire({
            icon: 'error',
            title: 'Erro!',
            text: 'Não foi possível salvar a empresa. Tente novamente.',
            confirmButtonText: 'Fechar',
        });
    }
});