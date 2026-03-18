const saveButton = document.getElementById('save-button');

saveButton.addEventListener('click', async () => {
    const data = {
        name: document.getElementById('name').value,
        price: document.getElementById('price').value,
    };

    try {
        const result = await window.electronAPI.saveProduct(data);
        console.log('Produto salvo com sucesso:', result);

        await Swal.fire({
            icon: 'success',
            title: 'Sucesso!',
            text: 'Produto salvo com sucesso.',
            confirmButtonText: 'OK',
            timer: 3000,
            timerProgressBar: true,
        });

    } catch (error) {
        console.error('Erro ao salvar produto:', error);

        await Swal.fire({
            icon: 'error',
            title: 'Erro!',
            text: 'Não foi possível salvar o produto. Tente novamente.',
            confirmButtonText: 'Fechar',
        });
    }
});